import React, { useState, useEffect } from 'react'
import { Box, HStack, Skeleton, Text } from 'native-base'
import { AvatarGroup } from './MemberAvatar'
import { GroupProps } from '../screens/Group'
import { api } from '../lib/axios'
import { Alert } from 'react-native'
import { UserProps } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth'
import { Pressable } from '@react-native-material/core'

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
  Paying: PayingProps[]
}

export interface PayingProps {
  user_id: string
  cost: string
  paid: boolean
  paidAt?: string
  createdAt: string
  updatedAt: string
  paying: UserProps
}

export default function CardGroup({ group }: CardGroupProps) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getExpenses()
  }, [])

  const getExpenses = async () => {
    setIsLoading(true)
    try {
      const date = new Date()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const query = `month=${month}&year=${year}`
      const response = await api.get(`/groups/${group.id}/expenses?${query}`)
      const monthlyExpenses: ExpenseProps[] = response.data.expenses || []
      const myExpenses = monthlyExpenses.filter(({ Paying }) => {
        return Paying.find(
          member => member.paid === false && member.paying.email === user.email
        )
      })
      setExpenses(myExpenses)
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
    <Box key={group.id} bg="dark.200" rounded="xl" width="full">
      <Pressable
        style={{
          padding: 16
        }}
        onPress={() => console.log('group')}
      >
        <Text color="white" fontSize="2xl">
          {group.title}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {isLoading ? (
              <Skeleton h={4} w={'3/5'} />
            ) : expenses.length > 0 ? (
              <Text color="red.500">
                {!isLoading && expenses.length} despesa
                {expenses.length > 1 && 's'} não paga
                {expenses.length > 1 && 's'}
              </Text>
            ) : (
              <Text color="green.400">Sua parte está em dia! :)</Text>
            )}
          </HStack>
          <AvatarGroup
            members={group.members?.map(({ member }) => member) || []}
          />
        </HStack>
      </Pressable>
    </Box>
  )
}
