import React from 'react'
import { PageWrapper } from '../../component/common'
import { LoginFeature } from '../../component/feature'

export const Login = () => {
  return (
    <PageWrapper style={{
      paddingHorizontal: 10,
      flex:1,
      justifyContent: "center",
    }}>
      <LoginFeature />
    </PageWrapper>
  )
}

export default Login
