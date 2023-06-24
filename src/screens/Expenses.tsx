import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, VStack } from 'native-base'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { api } from '../lib/axios'
import { Alert, RefreshControl } from 'react-native'
import { ExpenseProps } from '../components/CardGroup'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import PlusFab from '../components/PlusFab'
import { GroupProps } from './Group'

export interface ExpensesDateProps {
  month: number
  year: number
}

export default function Expenses() {
  const date = new Date()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { title, id } = route.params as GroupProps
  const [expenses, setExpenses] = useState<ExpenseProps[]>([])
  const [expensesDate, setExpensesDate] = useState<ExpensesDateProps>({
    month: date.getMonth() + 1,
    year: date.getFullYear()
  })

  const getExpenses = async () => {
    setIsLoading(true)
    try {
      const query = `month=${expensesDate.month}&year=${expensesDate.year}`
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
    }, [])
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
          left="back"
          right={
            <IconButton
              icon={({ size }) => <Icon name="cog" color="white" size={size} />}
            />
          }
        />
        <VStack px={4} py={8}>
          <VStack space={3}>{/** expenses */}</VStack>
        </VStack>
      </ScrollView>
      <PlusFab />
    </>
  )
}
