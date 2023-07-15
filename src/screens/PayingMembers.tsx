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
import { GroupMemberType } from './Groups'

export interface HandlePayingProps {
  id: string
  payers: string[]
  setPayers: (emails: string[]) => void
}

export default function PayingMembers() {
  const { goBack } = useNavigation()
  const { colors } = useTheme()
  const [members, setMembers] = useState<UserProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const route = useRoute()
  const { id, payers, setPayers } = route.params as HandlePayingProps

  function submit() {
    setPayers(selectedMembers)
    goBack()
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedMembers(payers)
    }, [])
  )

  async function getMembers() {
    try {
      setIsLoading(true)
      const response = await api.get(`/groups/${id}`)
      if (response.data.members) {
        const groupMembers: GroupMemberType[] = response.data.members
        setMembers(groupMembers.map(({ member }) => member))
      } else {
        Alert.alert(
          'Ops!',
          'Não foi possível buscar os membros do grupo, verifique a sua conexão com a internet e tente novamente mais tarde.'
        )
      }
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Ops!',
        'Não foi possível buscar os membros do grupo, verifique a sua conexão com a internet e tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getMembers()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      setMembers([])
      getMembers()
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
        title="Selecionar pagantes"
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
              members={members.map(member => {
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
