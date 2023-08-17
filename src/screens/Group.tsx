import React, { useCallback, useState } from 'react'
import { Badge, HStack, ScrollView, Text, VStack } from 'native-base'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { Alert, RefreshControl } from 'react-native'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { GroupProps } from './Groups'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/axios'
import MembersList from '../components/MembersList'
import PlusFab from '../components/PlusFab'
import { UserPlus } from 'phosphor-react-native'

export default function Group() {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { id } = route.params as GroupProps
  const [group, setGroup] = useState<GroupProps>(route.params as GroupProps)

  async function getGroup() {
    try {
      const response = await api.get(`/groups/${id}`)
      if (response.data.group) setGroup(response.data.group)
      else
        Alert.alert(
          'Ops!',
          'Não foi possível obter as informações deste grupo. Tente novamente mais tarde!'
        )
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não foi possível obter as informações deste grupo. Tente novamente mais tarde!'
      )
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getGroup()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      getGroup()
    }, [id])
  )

  return (
    <>
      <AppBar
        title={group.title}
        left="back"
        right={
          <IconButton
            onPress={() => {}}
            icon={({ size }) => (
              <Icon name="dots-vertical" color="white" size={size} />
            )}
          />
        }
      />
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <VStack space={4} px={4} py={8}>
          <HStack space={2} alignItems="center">
            <Text color="white" fontSize="xl">
              Membros:
            </Text>
            <Badge rounded="2xl">{group.Member.length}</Badge>
          </HStack>
          <MembersList members={group.Member.map(({ member }) => member)} />
        </VStack>
      </ScrollView>
      <PlusFab
        icon={<UserPlus color="white" size={24} />}
        onPress={() =>
          navigate('GroupMembers', {
            ...group,
            members: group.Member.filter(
              ({ member }) => member.email !== user.email
            ).map(({ member }) => member.email)
          })
        }
      />
    </>
  )
}
