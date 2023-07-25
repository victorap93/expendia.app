import React, { useState } from 'react'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'
import { HStack, Skeleton, Text, VStack } from 'native-base'
import { Pressable } from '@react-native-material/core'
import { AvatarGroup } from './MemberAvatar'
import dayjs from 'dayjs'
import { convertFloatToMoney, getUserPart } from '../helpers/expenseHelper'
import { useAuth } from '../hooks/useAuth'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from './ExpenseStatusMessage'

interface CardExpenseProps {
  expense: ExpenseProps
  handlePress?: (expense: ExpenseProps) => void
}

export function CardExpense({ expense, handlePress }: CardExpenseProps) {
  const { user } = useAuth()

  const userPart = getUserPart(expense.Paying, user.email)

  const [statusMessage, setStatusMessage] = useState<ExpenseStatusMessageSetup>(
    {
      status: null,
      color: '',
      message: ''
    }
  )

  return (
    <CardBox borderLeftColor={statusMessage.color} borderLeftWidth={4}>
      <Pressable
        style={{
          padding: 16
        }}
        onPress={handlePress ? () => handlePress(expense) : undefined}
      >
        <VStack space={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="lg">
              {expense.title}
            </Text>
            <Text color="white" fontSize="sm">
              {dayjs(expense.dueDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="lg">
              {convertFloatToMoney(userPart)}
            </Text>
            <ExpenseStatusMessage
              expense={expense}
              getStatusMessage={setStatusMessage}
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="md">
              Total:{' '}
              <Text fontWeight="extrabold">
                {convertFloatToMoney(Number(expense.cost))}
              </Text>
            </Text>
            <AvatarGroup
              size="sm"
              members={expense.Paying.map(({ paying }) => paying)}
            />
          </HStack>
        </VStack>
      </Pressable>
    </CardBox>
  )
}

export function CardSkeleton() {
  return (
    <CardBox p={4}>
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Skeleton h={4} w={'3/5'} />
          <Skeleton h={4} w={'1/5'} />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Skeleton h={4} w={'2/5'} />
          <Skeleton h={4} w={'2/5'} />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Skeleton h={4} w={'2/5'} />
          <HStack alignItems="center" space={1}>
            <Skeleton rounded="full" h={10} w={10} />
            <Skeleton rounded="full" h={10} w={10} />
            <Skeleton rounded="full" h={10} w={10} />
          </HStack>
        </HStack>
      </VStack>
    </CardBox>
  )
}
