import React, { useState, useEffect } from 'react'
import { Actionsheet, Box, HStack, ScrollView, Text, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import AppBar from '../components/AppBar'
import { IconButton, Pressable } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { GroupProps } from './Groups'
import MarkAsPaid from './MarkAsPaid'
import { useAuth } from '../hooks/useAuth'
import { ExpenseProps } from './Expenses'
import MenuActionSheet from '../components/MenuActionSheet'
import TotalValue from '../components/TotalValue'
import { ExpenseForm } from './ExpenseName'
import dayjs from 'dayjs'

export interface ExpenseDetails {
  group: GroupProps
  expense: ExpenseProps
}

export default function Expense() {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { group, expense: expenseParam } = route.params as ExpenseDetails
  const [expense, setExpense] = useState<ExpenseProps>(expenseParam)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false)
  const expenseForm = {
    ...expense,
    cost: Number(expense.cost),
    group_id: group.id,
    group_title: group.title,
    payers: expense.Paying.map(({ cost, paying: { email } }) => {
      return {
        cost: Number(cost),
        email
      }
    })
  } as ExpenseForm

  const getExpense = async (loading = true) => {
    setIsLoading(loading)
    try {
      const response = await api.get(`/expenses/${expense?.id}`)
      setExpense(response.data.expense)
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não foi possível buscar os dados atualizados da despesa'
      )
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getExpense()
    setRefreshing(false)
  }

  useEffect(() => {
    setExpense(expenseParam)
  }, [expenseParam])

  const editExpense = () => {
    if (expense) navigate('ExpenseName', expenseForm)
  }

  return (
    <>
      <AppBar
        title={expense.title}
        left="back"
        right={
          <IconButton
            onPress={() => setOpenMenu(true)}
            icon={({ size }) => (
              <Icon name="dots-vertical" color="white" size={size} />
            )}
          />
        }
      />
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <VStack px={4} py={4} my={8} space={8}>
          <TotalValue expense={expenseForm} />
          <HStack space={1} justifyContent="center" alignItems="center">
            <Text color="gray.200" fontSize="lg">
              Vencimento:
            </Text>
            <Text color="white" fontSize="lg">
              {dayjs(expense.dueDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
      <MarkAsPaid
        member={
          expense.Paying.find(({ paying }) => paying.email === user.email)
            ? user
            : expense.Paying[0].paying
        }
        members={expense.Paying.map(({ paying }) => paying)}
        isOpen={openMarkAsPaid}
        onClose={() => {
          setOpenMarkAsPaid(false)
          getExpense(false)
        }}
        expenses={[expense.id]}
      />
      <MenuActionSheet
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        items={[
          {
            icon: <Icon name="pencil" size={20} />,
            label: 'Editar',
            onPress: editExpense
          },
          {
            icon: <Icon name="delete" size={20} />,
            label: 'Excluir',
            onPress: () => {}
          },
          {
            icon: <Icon name="content-copy" size={20} />,
            label: 'Duplicar',
            onPress: () => {}
          }
        ]}
      />
    </>
  )
}
