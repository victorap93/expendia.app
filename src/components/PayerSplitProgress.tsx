import React from 'react'
import { HStack, Progress, Text, VStack } from 'native-base'
import { getRest, getSubtotalPercentage } from '../helpers/expenseHelper'
import { ExpenseForm } from '../screens/ExpenseName'

interface Props {
  expense: ExpenseForm
}

export default function PayerSplitProgress({ expense }: Props) {
  return (
    <VStack space={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="white">Faltam {getRest(expense)}</Text>
        <Text color="white">{getSubtotalPercentage(expense).toFixed()}%</Text>
      </HStack>
      <Progress colorScheme="success" value={getSubtotalPercentage(expense)} />
    </VStack>
  )
}
