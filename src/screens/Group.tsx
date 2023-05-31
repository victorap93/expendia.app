import React, { useCallback, useState } from 'react'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { UserProps } from '../context/AuthContext'
import { api } from '../lib/axios'
import { Alert } from 'react-native'
import { AvatarGroup } from '../components/MemberAvatar'

export interface GroupProps {
  id: string
  title: string
  members: {
    createdAt: string
    member: UserProps
  }[]
}

export default function Group() {
  const { navigate } = useNavigation()
  const { user, setUser } = useAuth()
  const [groups, setGroups] = useState<GroupProps[]>([])

  async function logout() {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('accessToken')
    setUser({} as UserProps)
    navigate('Home')
  }

  async function getGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data.groups || [])
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Ops!',
        'Não foi possível buscar os seus grupos, verifique a sua conexão com a internet e tente novamente mais tarde.'
      )
    }
  }

  useFocusEffect(
    useCallback(() => {
      getGroups()
    }, [])
  )

  return (
    <ScrollView>
      <Box px={4} pb={1} pt={8} roundedBottom={24} bg="dark.200" width="full">
        <VStack justifyContent="space-between">
          <HStack justifyContent="space-between">
            <Text color="white" onPress={logout}>
              {user.firstname} {user.lastname}
            </Text>
            <Text color="white" onPress={logout}>
              Sair
            </Text>
          </HStack>
          <Text my={4} fontSize="2xl" color="white">
            Meus grupos
          </Text>
        </VStack>
      </Box>
      <VStack px={4} py={8}>
        <VStack space={3}>
          {groups.length > 0 ? (
            groups.map(group => (
              <Box key={group.id} p={4} bg="dark.200" rounded="xl" width="full">
                <Text color="white" fontSize="lg">
                  {group.title}
                </Text>
                <AvatarGroup
                  members={group.members.map(member => {
                    return member.member
                  })}
                />
              </Box>
            ))
          ) : (
            <Text color="white">Carregando....</Text>
          )}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
