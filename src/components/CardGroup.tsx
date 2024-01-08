import React, { useState, useEffect, useMemo } from 'react'
import { HStack, Skeleton, Text, VStack } from 'native-base'
import { AvatarGroup } from './MemberAvatar'
import { GroupProps } from '../screens/Groups'
import { api } from '../lib/axios'
import { Alert } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { Pressable } from '@react-native-material/core'
import { present } from './DateController'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'

interface CardGroupProps {
  group: GroupProps
  handlePress?: (group: GroupProps) => void
}

export function CardGroup({ group, handlePress }: CardGroupProps) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getExpenses()
  }, [])

  const getExpenses = async () => {
    setIsLoading(true)
    try {
      const date = present
      const query = `month=${date.month + 1}&year=${date.year}`
      const response = await api.get(`/groups/${group.id}/expenses?${query}`)
      setExpenses(response.data.expenses || [])
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não foi possível buscar as despesas do grupo ' + group.title
      )
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const unpaidExpenses = useMemo(
    () =>
      expenses.filter(({ Paying }) => {
        return Paying.find(
          member => member.paid === false && member.paying.email === user.email
        )
      }),
    [expenses]
  )

  return (
    <CardBox key={group.id}>
      <Pressable
        style={{
          padding: 16
        }}
        onPress={handlePress ? () => handlePress(group) : undefined}
      >
        <Text color="white" fontSize="2xl">
          {group.title}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {isLoading ? (
              <Skeleton h={4} w={'3/5'} />
            ) : expenses.length > 0 ? (
              unpaidExpenses.length > 0 ? (
                <Text color="red.500">
                  {!isLoading && expenses.length} despesa
                  {expenses.length > 1 && 's'} não paga
                  {expenses.length > 1 && 's'}
                </Text>
              ) : (
                <Text color="green.400">Sua parte está em dia :)</Text>
              )
            ) : (
              <Text color="gray.500">Nenhuma despesa criada</Text>
            )}
          </HStack>
          <AvatarGroup members={group.Member.map(({ member }) => member)} />
        </HStack>
      </Pressable>
    </CardBox>
  )
}

export function CardSkeleton() {
  return (
    <CardBox p={4}>
      <VStack space={4}>
        <Skeleton h={4} w={'2/5'} />
        <HStack justifyContent="space-between" alignItems="center" space={1}>
          <Skeleton h={4} w={'3/5'} />
          <HStack alignItems="center" space={1}>
            <Skeleton rounded="full" h={10} w={10} />
          </HStack>
        </HStack>
      </VStack>
    </CardBox>
  )
}
