import { createContext, ReactNode, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-auth-session/providers/google'
import { CLIENT_ID } from '@env'
import { api } from '../lib/axios'

export interface UserProps {
  id?: string
  firstname?: string
  lastname?: string
  email: string
  avatarUri?: string
  noRedirect?: boolean
  hasPassword?: boolean
  confirmedEmail?: boolean | null
}

export interface AuthContextDataProps {
  isUserLoading: boolean
  user: UserProps
  setUser: (user: UserProps) => void
  getUser: () => Promise<void>
  continueWithGoogle: () => Promise<void>
  isOAuthLoading: boolean
  disabledOAuth: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [isOAuthLoading, setIsOAuthLoading] = useState(false)
  const disabledOAuth = !Boolean(CLIENT_ID)

  const [_, response, promptAsync] = disabledOAuth
    ? [null, null, null]
    : Google.useAuthRequest({
        clientId: CLIENT_ID || undefined,
        scopes: ['profile', 'email']
      })

  async function continueWithGoogle() {
    try {
      setIsOAuthLoading(true)
      if (promptAsync) await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsOAuthLoading(false)
    }
  }

  async function getUser() {
    try {
      setIsUserLoading(true)
      const userStorage = await AsyncStorage.getItem('user')
      if (userStorage) {
        const userData: UserProps = JSON.parse(userStorage)
        setUser(userData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsUserLoading(false)
    }
  }

  const signInWithGoogle = async (accessToken: string) => {
    try {
      setIsOAuthLoading(true)
      const response = await api.post('/google-auth', { accessToken })
      if (response.data.status && response.data.token) {
        await AsyncStorage.setItem('accessToken', response.data.token)
        setUser(response.data.user)
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsOAuthLoading(false)
    }
  }

  useEffect(() => {
    if (
      response &&
      response.type === 'success' &&
      response.authentication?.accessToken
    ) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  useEffect(() => {
    getUser()
  }, [])

  const storeUser = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  }

  useEffect(() => {
    storeUser()
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        user,
        setUser,
        getUser,
        continueWithGoogle,
        isOAuthLoading,
        disabledOAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
