import React, { useCallback, useState } from 'react'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { UserProps } from '../context/AuthContext'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import * as Item from '../components/CardGroup'
import AppBar from '../components/AppBar'

export interface GroupProps {
  id: string
  title: string
  Member: {
    createdAt: string
    member: UserProps
  }[]
}

export default function Group() {
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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <AppBar title="Meus grupos" left="menu" />
      <VStack px={4} py={8}>
        <VStack space={3}>
          {!isLoading ? (
            groups.map(group => <Item.CardGroup key={group.id} group={group} />)
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
  )
}
