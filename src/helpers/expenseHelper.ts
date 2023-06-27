import { ExpenseProps, PayingProps } from '../screens/Expenses'
import dayjs from 'dayjs'

export const getUserPart = (paying: PayingProps[], email: string) => {
  return paying.find(payer => payer.paying.email === email)?.cost || 0
}

export const isPaid = (paying: PayingProps[], email: string) => {
  return paying.find(payer => payer.paying.email === email)?.paid || null
}

export const isExpired = (expense: ExpenseProps) => {
  return dayjs(new Date()).isAfter(expense.dueDate)
}
