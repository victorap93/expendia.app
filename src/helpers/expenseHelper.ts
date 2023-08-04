import { ExpenseForm, PayerForm } from '../screens/ExpenseName'
import { ExpenseProps, PayingProps } from '../screens/Expenses'
import dayjs from 'dayjs'

export const getUserPart = (paying: PayingProps[], email: string) => {
  return Number(paying.find(payer => payer.paying.email === email)?.cost || '0')
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
  return value !== 0
    ? value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    : 'R$ 0,00'
}

export const getSubtotal = (payers: PayerForm[], checkIsPaid = false) => {
  let subtotal = 0
  payers.map(({ cost, paid }) => {
    subtotal += checkIsPaid && !paid ? 0 : cost
  })
  return subtotal
}

export const getSubtotalPercentage = (
  values: ExpenseForm,
  checkIsPaid = false
) => {
  const subtotal = Number(getSubtotal(values.payers, checkIsPaid).toFixed(2))
  return (subtotal / values.cost) * 100
}

export const getRest = (values: ExpenseForm, checkIsPaid = false) => {
  const subtotal = Number(getSubtotal(values.payers, checkIsPaid).toFixed(2))
  return values.cost - subtotal
}

export const settleUp = (values: ExpenseForm, checkIsPaid = false) => {
  const isSettleUp = getRest(values, checkIsPaid)
  return isSettleUp === 0
}
