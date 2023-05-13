import { View, Text } from 'react-native'
import React from 'react'
// import * as Google from 'expo-auth-session/providers/google'
// import * as AuthSession from 'expo-auth-session'
// import { publicApi } from '../lib/axios'

export default function GoogleAuth() {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: process.env.CLIENT_ID,
  //   redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
  //   scopes: ['profile', 'email']
  // })

  // const signIn = async () => {
  //   try {
  //     setIsUserLoading(true)
  //     // await promptAsync()
  //   } catch (error) {
  //     console.log(error)
  //     throw error
  //   } finally {
  //     setIsUserLoading(false)
  //   }
  // }

  // const signInWithGoogle = async (accessToken: string) => {
  //   try {
  //     setIsUserLoading(true)

  //     const tokenResponse = await publicApi.post('/users', { accessToken })
  //     publicApi.defaults.headers.common[
  //       'Authorization'
  //     ] = `Bearer ${tokenResponse.data.token}`

  //     const userInfoResponse = await publicApi.get('/me')
  //     setUser(userInfoResponse.data.user)
  //   } catch (error) {
  //     console.log(error)
  //     throw error
  //   } finally {
  //     setIsUserLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   if (response?.type === 'success' && response.authentication?.accessToken) {
  //     signInWithGoogle(response.authentication.accessToken)
  //   }
  // }, [response])

  return (
    <View>
      <Text>SignInWithGoogle</Text>
    </View>
  )
}
