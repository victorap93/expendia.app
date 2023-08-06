import React, { useCallback, useState, useEffect } from 'react'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import PlusFab from '../components/PlusFab'
import { GroupProps } from './Groups'
import DateController, {
  MonthlyProps,
  present
} from '../components/DateController'
import { UserProps } from '../context/AuthContext'
import { CardExpense, CardSkeleton } from '../components/CardExpense'
import MarkAsPaid from './MarkAsPaid'
import { useAuth } from '../hooks/useAuth'
import EmptyMessage from '../components/EmptyMessage'
import MarkAsPaidFab from '../components/MarkAsPaidFab'
import ExpenseDashboard from '../components/ExpenseDashboard'

export interface ExpenseProps {
  id: string
  title: string
  group_id: string
  cost: number
  dueDate: string
  createdAt: string
  updatedAt: string
  Paying: PayingProps[]
}

export interface PayingProps {
  user_id: string
  cost: number
  paid: boolean
  paidAt?: string
  createdAt: string
  updatedAt: string
  paying: UserProps
}

export default function Expenses() {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { title, id, Member } = route.params as GroupProps
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [selecteds, setSelecteds] = useState<string[]>([])
  const [payers, setPayers] = useState<UserProps[]>([])
  const [expensesDate, setExpensesDate] = useState<MonthlyProps>(present)
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false)

  const getExpenses = async (loading = true) => {
    setIsLoading(loading)
    try {
      const query = `month=${expensesDate.month + 1}&year=${expensesDate.year}`
      const response = await api.get(`/groups/${id}/expenses?${query}`)
      setExpenses(response.data.expenses || [])
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não foi possível buscar as despesas do grupo ' + title
      )
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getExpenses()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      setExpenses([])
      setSelecteds([])
      setPayers([])
      getExpenses()
    }, [expensesDate])
  )

  const handleSelecteds = (expense: ExpenseProps) => {
    setSelecteds(prevState => {
      return prevState.includes(expense.id)
        ? prevState.filter(id => id !== expense.id)
        : [...prevState, expense.id]
    })
  }

  const expensesNavigation = (expense: ExpenseProps) => {
    navigate('Expense', {
      expense,
      group: {
        id,
        title,
        Member
      }
    })
  }

  const editExpense = () => {
    const expense = expenses.find(({ id }) => id === selecteds[0])
    if (expense) {
      navigate('ExpenseName', {
        ...expense,
        cost: Number(expense.cost),
        group_id: id,
        group_title: title,
        payers: expense.Paying.map(({ cost, paying: { email } }) => {
          return {
            cost: Number(cost),
            email
          }
        })
      })
    }
  }

  const getPayers = () => {
    const expensePayers: UserProps[] = []
    selecteds.map(selected => {
      const selectedExpense = expenses.find(({ id }) => id === selected)
      if (selectedExpense) {
        selectedExpense.Paying.map(({ paying }) => {
          if (!expensePayers.find(({ email }) => email === paying.email)) {
            expensePayers.push(paying)
          }
        })
      }
    })
    setPayers([...expensePayers])
  }

  useEffect(() => {
    getPayers()
  }, [selecteds])

  return (
    <>
      <AppBar
        title={selecteds.length > 0 ? '' : title}
        onPress={() =>
          selecteds.length > 0 ? setSelecteds([]) : navigate('Groups')
        }
        left="back"
        right={
          selecteds.length > 0 ? (
            <HStack space={1}>
              {selecteds.length === 1 && (
                <IconButton
                  onPress={editExpense}
                  icon={({ size }) => (
                    <Icon name="pencil" color="white" size={size} />
                  )}
                />
              )}
              <IconButton
                icon={({ size }) => (
                  <Icon name="delete" color="white" size={size} />
                )}
              />
              <IconButton
                icon={({ size }) => (
                  <Icon name="content-copy" color="white" size={size} />
                )}
              />
            </HStack>
          ) : (
            <IconButton
              icon={({ size }) => <Icon name="cog" color="white" size={size} />}
            />
          )
        }
        bottom={<ExpenseDashboard expenses={expenses} />}
      />
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <VStack px={4} py={4} space={5}>
          <DateController date={expensesDate} onChange={setExpensesDate} />
          <VStack space={3}>
            {!isLoading ? (
              expenses.length > 0 ? (
                expenses.map(expense => (
                  <CardExpense
                    key={expense.id}
                    expense={expense}
                    handlePress={
                      selecteds.length > 0
                        ? handleSelecteds
                        : expensesNavigation
                    }
                    handleLongPress={handleSelecteds}
                    selected={selecteds.includes(expense.id)}
                  />
                ))
              ) : (
                <EmptyMessage message="Ops! Ainda não foi criada nenhuma despesa nesse mês..." />
              )
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </VStack>
        </VStack>
      </ScrollView>
      {openMarkAsPaid ? (
        <MarkAsPaid
          member={
            payers.find(({ email }) => email === user.email) ? user : payers[0]
          }
          members={payers}
          isOpen={true}
          onClose={() => {
            setOpenMarkAsPaid(false)
            getExpenses(false)
            setSelecteds([])
          }}
          expenses={selecteds}
        />
      ) : selecteds.length > 0 ? (
        <MarkAsPaidFab onPress={() => setOpenMarkAsPaid(true)} />
      ) : (
        <PlusFab
          onPress={() =>
            navigate('ExpenseName', {
              group_id: id,
              group_title: title,
              cost: 0,
              dueDate: '',
              title: '',
              payers: []
            })
          }
        />
      )}
    </>
  )
}
