import { Box, HStack, Text } from 'native-base'
import React from 'react'
import { ExpenseForm } from '../screens/ExpenseName'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import { convertFloatToMoney } from '../helpers/expenseHelper'

interface Props extends InterfaceBoxProps {
  expense: ExpenseForm
}

export default function TotalValue({ expense, ...rest }: Props) {
  return (
    <Box {...rest}>
      <HStack justifyContent="center" alignItems="baseline" space={1}>
        <Text fontSize={40} color="white">
          {convertFloatToMoney(expense.cost)}
        </Text>
      </HStack>
      <HStack justifyContent="center">
        <Text fontSize={20} color="gray.200">
          Valor Total:
          <Text fontWeight="bold">{' ' + expense.title}</Text>
        </Text>
      </HStack>
    </Box>
  )
}
