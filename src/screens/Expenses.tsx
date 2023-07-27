import React, { useCallback, useState, useEffect } from 'react'
import { Box, Fab, ScrollView, VStack } from 'native-base'
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
import { CheckCircle } from 'phosphor-react-native'
import MarkAsPaid from './MarkAsPaid'
import { useAuth } from '../hooks/useAuth'

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
  const { title, id } = route.params as GroupProps
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [selecteds, setSelecteds] = useState<string[]>([])
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

  return (
    <>
      <ScrollView
        h="full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <AppBar
          title={title}
          onPress={() => navigate('Groups')}
          left="back"
          right={
            <IconButton
              icon={({ size }) => <Icon name="cog" color="white" size={size} />}
            />
          }
        />
        <VStack px={4} py={4} space={5}>
          <DateController date={expensesDate} onChange={setExpensesDate} />
          <VStack space={3}>
            {!isLoading ? (
              expenses.map(expense => (
                <CardExpense
                  key={expense.id}
                  expense={expense}
                  handlePress={
                    selecteds.length > 0 ? handleSelecteds : undefined
                  }
                  handleLongPress={handleSelecteds}
                  selected={selecteds.includes(expense.id)}
                />
              ))
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
          user={user}
          isOpen={true}
          onClose={() => {
            setOpenMarkAsPaid(false)
            getExpenses(false)
            setSelecteds([])
          }}
          expenses={selecteds}
        />
      ) : selecteds.length > 0 ? (
        <PlusFab
          onPress={() => setOpenMarkAsPaid(true)}
          icon={<CheckCircle weight="fill" color="white" />}
          label="Marcar como pago"
          width={200}
          bgColor="green.500"
          _pressed={{
            bgColor: 'green.800'
          }}
        />
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
