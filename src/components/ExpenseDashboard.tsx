import React, { useState, useEffect } from 'react'
import { ExpenseProps } from '../screens/Expenses'
import { HStack, ScrollView, Text, VStack } from 'native-base'
import { convertFloatToMoney } from '../helpers/expenseHelper'
import { useAuth } from '../hooks/useAuth'

interface Props {
  expenses: ExpenseProps[]
}

export default function ExpenseDashboard({ expenses }: Props) {
  const { user } = useAuth()
  const [groupTotal, setGroupTotal] = useState<number>(0)
  const [userTotal, setUserTotal] = useState<number>(0)
  const [groupUnpaid, setGroupUnpaid] = useState<number>(0)
  const [userUnpaid, setUserUnpaid] = useState<number>(0)

  useEffect(() => {
    setGroupTotal(0)
    let newGroupTotal = 0
    let newUserTotal = 0
    let newGroupUnpaid = 0
    let newUserUnpaid = 0
    expenses.map(expense => {
      newGroupTotal += Number(expense.cost)
      expense.Paying.map(({ cost, paid, paying }) => {
        if (!paid) newGroupUnpaid += Number(cost)
        if (paying.email === user.email) {
          newUserTotal += Number(cost)
          if (!paid) newUserUnpaid += Number(cost)
        }
      })
    })
    setGroupTotal(newGroupTotal)
    setUserTotal(newUserTotal)
    setGroupUnpaid(newGroupUnpaid)
    setUserUnpaid(newUserUnpaid)
  }, [expenses])

  return (
    <ScrollView horizontal py={1}>
      <HStack w="full" space={2} alignItems="center">
        <VStack
          bgColor="dark.300"
          px={4}
          py={2}
          alignItems="flex-end"
          rounded="lg"
        >
          <Text color="white" fontSize={20}>
            {convertFloatToMoney(groupTotal)}
          </Text>
          <Text color="white" fontSize={14}>
            Total do grupo
          </Text>
        </VStack>
        <VStack
          bgColor="dark.300"
          px={4}
          py={2}
          alignItems="flex-end"
          rounded="lg"
        >
          <Text color="white" fontSize={20}>
            {convertFloatToMoney(userTotal)}
          </Text>
          <Text color="white" fontSize={14}>
            Total da sua parte
          </Text>
        </VStack>
        <VStack
          bgColor="dark.300"
          px={4}
          py={2}
          alignItems="flex-end"
          rounded="lg"
        >
          <Text color="white" fontSize={20}>
            {convertFloatToMoney(groupUnpaid)}
          </Text>
          <Text color="white" fontSize={14}>
            Total não pago do grupo
          </Text>
        </VStack>
        <VStack
          bgColor="dark.300"
          px={4}
          py={2}
          alignItems="flex-end"
          rounded="lg"
        >
          <Text color="white" fontSize={20}>
            {convertFloatToMoney(userUnpaid)}
          </Text>
          <Text color="white" fontSize={14}>
            Total não pago da sua parte
          </Text>
        </VStack>
      </HStack>
    </ScrollView>
  )
}
