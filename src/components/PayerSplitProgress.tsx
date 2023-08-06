import React from 'react'
import { HStack, Progress, Text, VStack } from 'native-base'
import {
  convertFloatToMoney,
  getRest,
  getSubtotalPercentage
} from '../helpers/expenseHelper'
import { ExpenseForm } from '../screens/ExpenseName'

interface Props {
  expense: ExpenseForm
  checkIsPaid?: boolean
}

export default function PayerSplitProgress({
  expense,
  checkIsPaid = false
}: Props) {
  const rest = getRest(expense, checkIsPaid)
  const exceeded = rest < 0

  return (
    <VStack space={2}>
      <HStack justifyContent="space-between" alignItems="center">
        {exceeded ? (
          <Text color="red.500">
            Ultrapassou {convertFloatToMoney(rest).replace('-', '')}
          </Text>
        ) : (
          <Text color="white">Faltam {convertFloatToMoney(rest)}</Text>
        )}
        <Text color={exceeded ? 'red.500' : 'white'}>
          {getSubtotalPercentage(expense, checkIsPaid).toFixed()}%
        </Text>
      </HStack>
      <Progress
        colorScheme={exceeded ? 'error' : 'success'}
        value={getSubtotalPercentage(expense, checkIsPaid)}
      />
    </VStack>
  )
}
