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
}

export default function PayerSplitProgress({ expense }: Props) {
  const rest = getRest(expense)
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
          {getSubtotalPercentage(expense).toFixed()}%
        </Text>
      </HStack>
      <Progress
        colorScheme={exceeded ? 'error' : 'success'}
        value={getSubtotalPercentage(expense)}
      />
    </VStack>
  )
}
