import { ExpenseForm, PayerForm } from '../screens/ExpenseName'
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

export const getSubtotal = (payers: PayerForm[]) => {
  let subtotal = 0
  payers.map(({ cost }) => (subtotal += cost))
  return subtotal
}

export const getSubtotalPercentage = (values: ExpenseForm) => {
  const subtotal = getSubtotal(values.payers)
  const total = convertMoneyToFloat(values.cost)
  return (subtotal / total) * 100
}

export const getRest = (values: ExpenseForm) => {
  const subtotal = getSubtotal(values.payers)
  const total = convertMoneyToFloat(values.cost)
  return convertFloatToMoney(total - subtotal)
}
