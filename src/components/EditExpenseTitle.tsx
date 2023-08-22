import React from 'react'
import { Alert } from 'react-native'
import EditTitle from './EditTitle'
import { getExpenseForm } from '../helpers/expenseHelper'
import { ExpenseProps } from '../screens/Expenses'
import { api } from '../lib/axios'
import { GroupProps } from '../screens/Groups'

interface Props {
  group: GroupProps
  expense: ExpenseProps
  setExpense: (expense: ExpenseProps) => void
  onClose: () => void
}

export default function EditExpenseTitle({
  group,
  expense,
  setExpense,
  onClose
}: Props) {
  async function changeTitle(title: string) {
    try {
      const response = await api.put(`/expenses/${expense.id}`, {
        ...getExpenseForm(expense, group),
        title
      })
      if (response.data.status) {
        setExpense({
          ...expense,
          title
        })
      } else {
        Alert.alert('Ops!', 'Não foi possível alterar o título do grupo.')
      }
    } catch (error) {
      Alert.alert('Ops!', 'Não foi possível alterar o título do grupo.')
      console.error(error)
    } finally {
      onClose()
    }
  }

  return (
    <EditTitle
      defaultValue={expense.title}
      onClose={onClose}
      onSave={changeTitle}
    />
  )
}
