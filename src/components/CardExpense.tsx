import React, { useState } from 'react'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'
import {
  Badge,
  Box,
  HStack,
  Skeleton,
  Text,
  VStack,
  useTheme
} from 'native-base'
import { Pressable } from '@react-native-material/core'
import { AvatarGroup } from './MemberAvatar'
import dayjs from 'dayjs'
import { convertFloatToMoney, getUserPart } from '../helpers/expenseHelper'
import { useAuth } from '../hooks/useAuth'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from './ExpenseStatusMessage'
import { Check, CheckCircle } from 'phosphor-react-native'

interface CardExpenseProps {
  expense: ExpenseProps
  handlePress?: (expense: ExpenseProps) => void
  handleLongPress?: (expense: ExpenseProps) => void
  selected?: boolean
}

export function CardExpense({
  expense,
  handlePress,
  handleLongPress,
  selected
}: CardExpenseProps) {
  const { user } = useAuth()
  const { colors } = useTheme()

  const userPart = getUserPart(expense.Paying, user.email)

  const [statusMessage, setStatusMessage] = useState<ExpenseStatusMessageSetup>(
    {
      status: null,
      color: '',
      message: ''
    }
  )

  return (
    <CardBox
      borderLeftColor={statusMessage.color}
      borderLeftWidth={4}
      position="relative"
    >
      {selected && (
        <Badge
          position="absolute"
          left={-10}
          top={-10}
          bgColor={'green.500'}
          rounded="full"
          variant="solid"
          padding={0.5}
        >
          <Check weight="fill" color={'white'} />
        </Badge>
      )}
      <Pressable
        style={{
          padding: 16
        }}
        onPress={handlePress ? () => handlePress(expense) : undefined}
        onLongPress={
          handleLongPress ? () => handleLongPress(expense) : undefined
        }
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
