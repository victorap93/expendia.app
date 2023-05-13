import { createContext, ReactNode, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserProps {
  firstname: string
  lastname: string
  email: string
  avatarUrl?: string
}

export interface AuthContextDataProps {
  isUserLoading: boolean
  user: UserProps
  setUser: (user: UserProps) => void
  getUser: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(true)

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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        user,
        setUser,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
