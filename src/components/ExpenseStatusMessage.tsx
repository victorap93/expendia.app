import React, { useEffect, useState } from 'react'
import { HStack, Text, useTheme } from 'native-base'
import { Circle } from 'phosphor-react-native'
import { getUserPart, isExpired, isPaid } from '../helpers/expenseHelper'
import { ExpenseProps } from '../screens/Expenses'
import { UserProps } from '../context/AuthContext'

export interface ExpenseStatusMessageSetup {
  status: string | null
  color: string
  message: string
}

interface ExpenseStatusMessageProps {
  expense: ExpenseProps
  payer: UserProps
  getStatusMessage?: (statusMessage: ExpenseStatusMessageSetup) => void
}

export default function ExpenseStatusMessage({
  expense,
  payer,
  getStatusMessage
}: ExpenseStatusMessageProps) {
  const { colors } = useTheme()

  const statusMessagesSetup: ExpenseStatusMessageSetup[] = [
    {
      status: 'paid',
      color: colors.green['400'],
      message: 'Pago'
    },
    {
      status: 'unpaid',
      color: colors.gray['200'],
      message: 'Não pago'
    },
    {
      status: 'expired',
      color: colors.red['500'],
      message: 'Vencida'
    },
    {
      status: null,
      color: '',
      message: ''
    }
  ]

  const userPart = getUserPart(expense.Paying, payer.email)
  const userPaid = isPaid(expense.Paying, payer.email)
  const expenseIsExpired = isExpired(expense)

  const [statusMessage, setStatusMessage] = useState<ExpenseStatusMessageSetup>(
    statusMessagesSetup[4]
  )

  useEffect(() => {
    if (userPart > 0) {
      const userExpenseStatusMessage: ExpenseStatusMessageSetup = userPaid
        ? statusMessagesSetup[0]
        : expenseIsExpired
        ? statusMessagesSetup[2]
        : statusMessagesSetup[1]
      setStatusMessage(userExpenseStatusMessage)
      if (getStatusMessage) getStatusMessage(userExpenseStatusMessage)
    }
  }, [expense])

  return statusMessage?.status ? (
    <HStack space={1} alignItems="center">
      <Circle color={statusMessage.color} weight="fill" size={16} />
      <Text color="white" fontSize="sm">
        {statusMessage.message}
      </Text>
    </HStack>
  ) : (
    <></>
  )
}
