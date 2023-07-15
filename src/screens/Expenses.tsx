import React, { useCallback, useState, useEffect } from 'react'
import { ScrollView, VStack } from 'native-base'
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

export interface ExpenseProps {
  id: string
  title: string
  group_id: string
  cost: string
  dueDate: string
  createdAt: string
  updatedAt: string
  Paying: PayingProps[]
}

export interface PayingProps {
  user_id: string
  cost: string
  paid: boolean
  paidAt?: string
  createdAt: string
  updatedAt: string
  paying: UserProps
}

export default function Expenses() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { title, id } = route.params as GroupProps
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [expensesDate, setExpensesDate] = useState<MonthlyProps>(present)

  const getExpenses = async () => {
    setIsLoading(true)
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
                <CardExpense key={expense.id} expense={expense} />
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
      <PlusFab
        onPress={() =>
          navigate('ExpenseName', {
            group_id: id,
            cost: '',
            dueDate: '',
            title: '',
            payers: []
          })
        }
      />
    </>
  )
}
