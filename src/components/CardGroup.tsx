import React, { useState, useEffect } from 'react'
import { Box, HStack, Pressable, Skeleton, Text } from 'native-base'
import { AvatarGroup } from './MemberAvatar'
import { GroupProps } from '../screens/Group'
import { api } from '../lib/axios'
import { Alert } from 'react-native'

interface CardGroupProps {
  group: GroupProps
}

export interface ExpenseProps {
  title: string
  group_id: string
  cost: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface MemberExpenseProps {
  expense_id: string
  cost: string
  paid: boolean
  paidAt?: string
  createdAt: string
  updatedAt: string
  expense: ExpenseProps
}

export default function CardGroup({ group }: CardGroupProps) {
  const [expenses, setExpenses] = useState<MemberExpenseProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getExpenses()
  }, [])

  const getExpenses = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/groups/${group.id}/expenses`)
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

  return (
    <Box key={group.id} p={4} bg="dark.200" rounded="xl" width="full">
      <Pressable onPress={() => console.log('group')}>
        <Text color="white" fontSize="2xl">
          {group.title}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {isLoading && <Skeleton h={10} w={5} />}
            <Text color="gray.200">
              {!isLoading && expenses.length} despesa
              {expenses.length > 1 && 's'}
            </Text>
          </HStack>
          <AvatarGroup members={group.members.map(({ member }) => member)} />
        </HStack>
      </Pressable>
    </Box>
  )
}
