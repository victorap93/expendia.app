import React from 'react'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'
import { HStack, Pressable, Text, VStack } from 'native-base'
import { AvatarGroup } from './MemberAvatar'

interface CardExpenseProps {
  expense: ExpenseProps
  handlePress?: (expense: ExpenseProps) => void
}
export function CardExpense({ expense, handlePress }: CardExpenseProps) {
  return (
    <CardBox>
      <Pressable
        style={{
          padding: 16
        }}
        onPress={handlePress ? () => handlePress(expense) : undefined}
      >
        <HStack justifyContent="space-between">
          <Text color="white" fontSize="2xl">
            {expense.title}
          </Text>
          <Text color="white" fontSize="sm">
            {expense.dueDate}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack space={2}>
            <Text color="white" fontSize="lg">
              R$ {expense.Paying[0].cost}
            </Text>
            <Text color="white" fontSize="md">
              Total: R$ {expense.cost}
            </Text>
          </VStack>
          <AvatarGroup members={expense.Paying.map(({ paying }) => paying)} />
        </HStack>
      </Pressable>
    </CardBox>
  )
}
