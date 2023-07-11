import React, { useCallback, useState } from 'react'
import { ScrollView, VStack, useTheme } from 'native-base'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { UserProps } from '../context/AuthContext'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import MembersList from '../components/MembersList'
import { CheckCircle, Circle } from 'phosphor-react-native'
import { CardSkeleton } from '../components/CardMember'
import { FormGroup } from './GroupName'

export interface HandleMembersProps {
  members: string[]
  setMembers: (emails: string[]) => void
}

export default function RecentMembers() {
  const { goBack } = useNavigation()
  const { colors } = useTheme()
  const [recentMembers, setRecentMembers] = useState<UserProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const route = useRoute()
  const { members, setMembers } = route.params as HandleMembersProps

  function submit() {
    setMembers(selectedMembers)
    goBack()
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedMembers(members)
    }, [])
  )

  async function getRecentMembers() {
    try {
      setIsLoading(true)
      const response = await api.get('/recent-members')
      setRecentMembers(response.data.members || [])
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Ops!',
        'Não foi possível buscar os membros recentes, verifique a sua conexão com a internet e tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getRecentMembers()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      setRecentMembers([])
      getRecentMembers()
    }, [])
  )

  const handlePress = (member: UserProps) => {
    setSelectedMembers(prevState => {
      return selectedMembers.includes(member.email)
        ? prevState.filter(email => email !== member.email)
        : [...prevState, member.email]
    })
  }

  return (
    <ScrollView
      h="full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <AppBar
        title="Membros recentes"
        left="back"
        right={
          <IconButton
            onPress={submit}
            icon={({ size }) => <Icon name="check" color="white" size={size} />}
          />
        }
      />
      <VStack px={4} py={8}>
        <VStack space={3}>
          {!isLoading ? (
            <MembersList
              onPress={handlePress}
              members={recentMembers.map(member => {
                return {
                  ...member,
                  endComponent: selectedMembers.includes(member.email) ? (
                    <CheckCircle weight="fill" color="green" />
                  ) : (
                    <Circle color={colors.gray[400]} />
                  )
                }
              })}
            />
          ) : (
            <>
              <CardSkeleton nameSkeleton />
              <CardSkeleton />
              <CardSkeleton nameSkeleton />
            </>
          )}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
