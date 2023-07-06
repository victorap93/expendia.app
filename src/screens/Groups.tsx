import React, { useCallback, useState } from 'react'
import { ScrollView, VStack } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { UserProps } from '../context/AuthContext'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import * as Item from '../components/CardGroup'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import PlusFab from '../components/PlusFab'

export interface GroupProps {
  id: string
  title: string
  Member: {
    createdAt: string
    member: UserProps
  }[]
}

export default function Group() {
  const { navigate } = useNavigation()
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
    <>
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <AppBar
          title="Meus grupos"
          left="menu"
          right={
            <IconButton
              onPress={() => navigate('GroupName')}
              icon={({ size }) => (
                <Icon name="plus" color="white" size={size} />
              )}
            />
          }
        />
        <VStack px={4} py={8}>
          <VStack space={3}>
            {!isLoading ? (
              groups.map(group => (
                <Item.CardGroup
                  key={group.id}
                  group={group}
                  handlePress={item => navigate('Expenses', item)}
                />
              ))
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
