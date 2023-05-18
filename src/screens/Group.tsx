import { View } from 'react-native'
import React from 'react'
import { HStack, Text, VStack } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { UserProps } from '../context/AuthContext'

export default function Group() {
  const { navigate } = useNavigation()
  const { user, setUser } = useAuth()

  async function logout() {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('accessToken')
    setUser({} as UserProps)
    navigate('Home')
  }

  return (
    <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
      <HStack justifyContent="space-between">
        <Text color="white" onPress={logout}>
          {user.firstname} {user.lastname}
        </Text>
        <Text color="white" onPress={logout}>
          Sair
        </Text>
      </HStack>
    </VStack>
  )
}
