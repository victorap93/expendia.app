import React, { useState } from 'react'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'
import { Badge, HStack, Skeleton, Text, VStack, useTheme } from 'native-base'
import { Pressable } from '@react-native-material/core'
import { AvatarGroup } from './MemberAvatar'
import dayjs from 'dayjs'
import { convertFloatToMoney, getUserPart } from '../helpers/expenseHelper'
import { useAuth } from '../hooks/useAuth'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from './ExpenseStatusMessage'
import { Check, User } from 'phosphor-react-native'

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
          <HStack justifyContent="space-between" alignItems="flex-start" w="full" space={4}>
            <Text color="white" fontSize="lg" flex={1}>
              {expense.title}
            </Text>
            <Text color="white" fontSize="sm">
              {dayjs(expense.dueDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="flex-start" space={4}>
            <Text color="white" fontSize="lg" flex={1}>
              {convertFloatToMoney(userPart)}
            </Text>
            <ExpenseStatusMessage
              payer={user}
              expense={expense}
              getStatusMessage={setStatusMessage}
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="flex-end" space={4}>
            <HStack space={1} flex={1}>
              <Text color="white" fontSize="md">
                Total:{' '}
                <Text fontWeight="extrabold">
                  {convertFloatToMoney(Number(expense.cost))}
                </Text>
              </Text>
              <Badge rounded="md" alignSelf="center" px={1} bg="dark.300">
                <HStack space={0.5} alignItems="center">
                  <User size={12} color="white" />
                  <Text fontSize={12} color="white">
                    {`${
                      expense.Paying.filter(({ paid }) => paid === true).length
                    }/${expense.Paying.length}`}
                  </Text>
                </HStack>
              </Badge>
            </HStack>
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
    <CardBox
      borderLeftColor={"coolGray.400"}
      borderLeftWidth={4}
      position="relative"
    >
      <Pressable style={{ padding: 16 }} disabled>
        <VStack space={1}>
          <HStack justifyContent="space-between" alignItems="flex-start" w="full" space={4}>
            <Skeleton rounded="md" h={5} w={48} startColor="#fff" opacity={0.5} my={1} />
            <Skeleton rounded="md" h={3} w={24} startColor="#fff" opacity={0.5} my={1} />
          </HStack>
          <HStack justifyContent="space-between" alignItems="flex-start" space={4}>
            <Skeleton rounded="md" h={5} w={24} startColor="#fff" opacity={0.5} my={1} />
            <HStack alignItems="center" space={1}>
              <Skeleton rounded="full" size={4} startColor="#fff" opacity={0.5} my={1} />
              <Skeleton rounded="md" h={3} w={12} startColor="#fff" opacity={0.5} my={1} />
            </HStack>
          </HStack>
          <HStack justifyContent="space-between" alignItems="flex-end" space={4}>
            <HStack space={2}>
              <Skeleton rounded="md" h={4} w={32} startColor="#fff" opacity={0.5} my={1} />
              <Skeleton rounded="md" h={4} w={10} startColor="#fff" opacity={0.5} my={1} />
            </HStack>
            <Skeleton rounded="full" size={8} startColor="#fff" opacity={0.5} my={1} />
          </HStack>
        </VStack>
      </Pressable>
    </CardBox>
  )
}
