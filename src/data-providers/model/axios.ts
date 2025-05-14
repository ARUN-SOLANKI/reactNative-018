/* eslint-disable no-param-reassign */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'


import {
  ACCESS_TOKEN,
  KEEP_LOGIN,
  REFRESH_TOKEN,
  USER_ID_TOKEN,
  X_USER_PLATFORM,
  getRefreshToken,
  logOutEndPoint,
  loginEndpoint,
  refreshTokenEndpoint,
  userSessionActive,
  userSessionInactive,
} from './token'
import { baseServerUrl } from '../../environment'
import AsyncStorage from '@react-native-async-storage/async-storage'

type FailedQueue = any[]

/**
 * Client Instance
 * @description Main axios instance for API calls with interceptors
 */
const clientInstance = axios.create({
  baseURL: baseServerUrl,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Additional Instance
 * @description Additional axios instance for API calls with interceptors
 */
const additionalInstance = axios.create({
  baseURL: baseServerUrl,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false

const failedClientQueue: FailedQueue = []
const failedAdditionalQueue: FailedQueue = []

function handleRequest(req: InternalAxiosRequestConfig) {
  [ACCESS_TOKEN, USER_ID_TOKEN].forEach(async (token) => {
    const tokenValue = await AsyncStorage.getItem(token)
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)

    if (!accessToken) {
      // Add is-guest-user header only for unauthenticated requests
      req.headers['is-guest-user'] = true
    }

    if (req.url?.includes(loginEndpoint)) {
      req.headers[X_USER_PLATFORM] = 'web'
    }

    if (tokenValue) {
      // eslint-disable-next-line no-param-reassign
      // req.headers[token] = tokenValue
      if (!req.url?.includes(refreshTokenEndpoint)) {
        // eslint-disable-next-line no-param-reassign
        req.headers.Authorization = `Bearer ${accessToken}`
      }
      if (req.url?.includes(logOutEndPoint)) {
        req.headers[REFRESH_TOKEN] = await AsyncStorage.getItem(REFRESH_TOKEN)
      }
    }
  })
  return req
}

function processQueue(error: AxiosError | null, token = null) {
  // TODO: Can be combined into one queue
  ;[failedClientQueue, failedAdditionalQueue].forEach((failedQueue) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })
    // failedQueue.length = 0
  })
}

function handleSuccess(response: AxiosResponse) {
  /**
   * set token if user is verified
   */

  if (
    response.config.url &&
    [refreshTokenEndpoint, loginEndpoint].includes(response.config.url)
  ) {

    userSessionActive(response.data.data)
  }
  return response
}

function handleError(instance: AxiosInstance, failedQueue: FailedQueue) {
  return async (error: AxiosError<unknown>) => {
    const status = error.response?.status
    const originalRequest = error.config

    if (
      status === 401 &&
      originalRequest?.url &&
      ![refreshTokenEndpoint, loginEndpoint].includes(originalRequest.url)
    ) {
      /**
       * if access-token is expired, get new access-token from refresh-token and retry requests
       */

      if (isRefreshing) {
        /**
         * if refresh token api is pending, adding new request to failed queue
         */
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((accessToken) => {
            originalRequest.headers[ACCESS_TOKEN] = accessToken
            return instance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      // Setting isRefreshing to true to prevent multiple requests
      isRefreshing = true

      return clientInstance
        .post(
          refreshTokenEndpoint,
          {},
          {
            headers: {
              [REFRESH_TOKEN]: await getRefreshToken(),
            },
          }
        )
        .then(async (res) => {
          const accessToken = res.headers[ACCESS_TOKEN]
          userSessionActive(res.headers)
          originalRequest.headers[ACCESS_TOKEN] = accessToken

          /**
           * processing all the failed request with new access token
           */
          return instance(originalRequest)
            .then((originalResponse) => {
              processQueue(null, accessToken)
              return originalResponse
            })
            .catch((originalError) => {
              processQueue(originalError, null)
              return Promise.reject(originalError)
            })
        })
        .catch((err: AxiosError) => {
          userSessionInactive()
          return Promise.reject(err)
        })
        .finally(() => {
          isRefreshing = false
        })
    }
    return Promise.reject(error)
  }
}

clientInstance.interceptors.request.use(handleRequest)
clientInstance.interceptors.response.use(
  handleSuccess,
  handleError(clientInstance, failedClientQueue)
)

additionalInstance.interceptors.request.use(handleRequest)
additionalInstance.interceptors.response.use(
  handleSuccess,
  handleError(additionalInstance, failedAdditionalQueue)
)

const axiosInstance = {
  client: clientInstance,
  additional: additionalInstance,
}

export default axiosInstance
export type AxiosInstanceTypes = keyof typeof axiosInstance
