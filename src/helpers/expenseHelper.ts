import { ExpenseProps, PayingProps } from '../screens/Expenses'
import dayjs from 'dayjs'

export const getUserPart = (paying: PayingProps[], email: string) => {
  return paying.find(payer => payer.paying.email === email)?.cost || '0'
}

export const isPaid = (paying: PayingProps[], email: string) => {
  return paying.find(payer => payer.paying.email === email)?.paid || null
}

export const isExpired = (expense: ExpenseProps) => {
  return dayjs(new Date()).isAfter(expense.dueDate)
}

export const convertMoneyToFloat = (value: string) => {
  const cleanValue = value.replace('R$', '').replace('.', '')
  const convertedValue = cleanValue.replace(',', '.')
  return parseFloat(convertedValue)
}

export const convertFloatToMoney = (value: number) => {
  return value > 0
    ? value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    : 'R$ 0,00'
}
