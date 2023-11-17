import React, { useCallback, useState } from 'react'
import { Image, ScrollView, Text, VStack } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { UserProps } from '../context/AuthContext'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import * as Item from '../components/CardGroup'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import PlusFab from '../components/PlusFab'
import EmptyMessage from '../components/EmptyMessage'
import { useAuth } from '../hooks/useAuth'
import ConfirmEmail from './ConfirmEmail'

export type GroupMemberType = {
  createdAt: string
  member: UserProps
}

export interface GroupProps {
  id: string
  title: string
  user_id: string
  Member: GroupMemberType[]
}

export default function Groups() {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [groups, setGroups] = useState<GroupProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  async function getGroups() {
    try {
      setIsLoading(true)
      const response = await api.get('/groups')
      setGroups(response.data.groups || [])
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Ops!',
        'Não foi possível buscar os seus grupos, verifique a sua conexão com a internet e tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getGroups()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      setGroups([])
      getGroups()
    }, [])
  )

  return !user.confirmedEmail ? (
    <ConfirmEmail />
  ) : (
    <>
      <AppBar
        title="Meus grupos"
        left="menu"
        right={
          <IconButton
            onPress={() => navigate('GroupName')}
            icon={({ size }) => <Icon name="plus" color="white" size={size} />}
          />
        }
      />
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <VStack px={4} py={8}>
          <VStack space={3}>
            {!isLoading ? (
              groups.length > 0 ? (
                groups.map(group => (
                  <Item.CardGroup
                    key={group.id}
                    group={group}
                    handlePress={item => navigate('Expenses', item)}
                  />
                ))
              ) : (
                <VStack
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  space={6}
                >
                  <Text color="white" textAlign="center" fontSize="3xl">
                    Bem vindo ao
                  </Text>
                  <Image
                    source={require('../assets/logo.png')}
                    alt="Expendia Logo"
                    width="3/4"
                    height={50}
                  />
                  <EmptyMessage message="Crie um novo grupo ou peça para adicionarem seu e-mail em um grupo existente." />
                </VStack>
              )
            ) : (
              <>
                <Item.CardSkeleton />
                <Item.CardSkeleton />
                <Item.CardSkeleton />
              </>
            )}
          </VStack>
        </VStack>
      </ScrollView>
      <PlusFab onPress={() => navigate('GroupName')} />
    </>
  )
}
