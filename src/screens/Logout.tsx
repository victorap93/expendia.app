import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { UserProps } from '../context/AuthContext'

export default function Logout() {
  const { setUser } = useAuth()
  const { navigate } = useNavigation()

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('user')
    setUser({} as UserProps)
    navigate('Home')
  }

  useEffect(() => {
    logout()
  }, [])

  return <></>
}
