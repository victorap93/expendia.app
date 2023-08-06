import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Logout() {

  const { navigate } = useNavigation()

  useEffect(() => {
    AsyncStorage.clear()
    navigate('Home')
  }, [])

  return <></>
}
