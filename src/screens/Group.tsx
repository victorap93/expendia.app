import { View } from 'react-native'
import React from 'react'
import { Text, VStack } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'

export default function Group() {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  async function logout() {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('accessToken')
    navigate('Home')
  }

  return (
    <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
      <Text color="white" onPress={logout}>
        Sair como {user.firstname} {user.lastname}
      </Text>
    </VStack>
  )
}
