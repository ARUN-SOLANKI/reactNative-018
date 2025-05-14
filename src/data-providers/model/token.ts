import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { AxiosResponse } from 'axios'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const USER_ID_TOKEN = 'x-user-id'
export const KEEP_LOGIN = 'keepLogin'
export const X_USER_PLATFORM = 'x-user-platform'

const loginTokens = [ACCESS_TOKEN, REFRESH_TOKEN, USER_ID_TOKEN] as const

// FIXME: Add as per your API endpoint or get them while creating instance
export const loginEndpoint = 'api/v1/user/login'
export const refreshTokenEndpoint = 'auth/refresh'
export const logOutEndPoint = 'auth/logout'

export const userSessionActive = async (headers: AxiosResponse['headers']) => {

  loginTokens.forEach(async (tokenName) => {
    await AsyncStorage.removeItem(tokenName)
    // await AsyncStorage.setItem(tokenName, headers[tokenName.toLowerCase()])
    await AsyncStorage.setItem(tokenName, headers[tokenName])
  })

 
}

export const userSessionInactive = () => {
  const navigation = useNavigation()
  ;[...loginTokens, KEEP_LOGIN].forEach(async (tokenName) => {
    await AsyncStorage.removeItem(tokenName)
  })
  // navigation.navigate('home')
}

export const getUserId = async () => await AsyncStorage.getItem(USER_ID_TOKEN) ?? ''
export const getAccessToken = async () => await  AsyncStorage.getItem(ACCESS_TOKEN) ?? ''
export const getRefreshToken = async () => await AsyncStorage.getItem(REFRESH_TOKEN) ?? ''
