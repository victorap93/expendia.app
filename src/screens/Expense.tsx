import React, { useState, useEffect } from 'react'
import {
  Actionsheet,
  Badge,
  Box,
  HStack,
  ScrollView,
  Text,
  VStack
} from 'native-base'
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
import MembersList from '../components/MembersList'
import { convertFloatToMoney } from '../helpers/expenseHelper'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from '../components/ExpenseStatusMessage'
import PayerSplitProgress from '../components/PayerSplitProgress'
import MarkAsPaidFab from '../components/MarkAsPaidFab'
import { UserProps } from '../context/AuthContext'
import DeleteExpense from '../components/DeleteExpense'

export interface ExpenseDetails {
  group: GroupProps
  expense: ExpenseProps
}

interface ExpenseStatusMessageSetupPayer extends ExpenseStatusMessageSetup {
  email: string
}

export default function Expense() {
  const { user } = useAuth()
  const { navigate, goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { group, expense: expenseParam } = route.params as ExpenseDetails
  const [expense, setExpense] = useState<ExpenseProps>(expenseParam)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const expenseForm = {
    ...expense,
    cost: Number(expense.cost),
    group_id: group.id,
    group_title: group.title,
    payers: expense.Paying.map(({ cost, paid, paying: { email } }) => {
      return {
        cost: Number(cost),
        email,
        paid
      }
    })
  } as ExpenseForm
  const [statusMessages, setStatusMessages] = useState<
    ExpenseStatusMessageSetupPayer[]
  >([])
  const [selectedMember, setSelectedMember] = useState<UserProps>(
    expense.Paying.find(({ paying }) => paying.email === user.email)
      ? user
      : expense.Paying[0].paying
  )
  const userPayer = expense.Paying.find(
    ({ paying }) => paying.email === user.email
  )

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

  const handleStatusMessages = (
    statusMessage: ExpenseStatusMessageSetup,
    email: string
  ) => {
    const newStatus = { ...statusMessage, email }
    setStatusMessages(prevState => {
      const index = prevState.findIndex(status => status.email === email)

      if (index > -1) {
        prevState[index] = newStatus
        return [...prevState]
      } else {
        return [...prevState, newStatus]
      }
    })
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
          <VStack space={5}>
            <PayerSplitProgress expense={expenseForm} checkIsPaid />
            <HStack space={2} alignItems="center">
              <Text color="white" fontSize="xl">
                Pagantes:
              </Text>
              <Badge rounded="2xl">{expense.Paying.length}</Badge>
            </HStack>
            <MembersList
              onPress={member => {
                setSelectedMember(member)
                setOpenMarkAsPaid(true)
              }}
              members={expense.Paying.map(({ cost, paying, paid, paidAt }) => {
                return {
                  ...paying,
                  hideSubtitle: true,
                  endComponent: (
                    <Text color="white">
                      {convertFloatToMoney(Number(cost))}
                    </Text>
                  ),
                  bottomComponent: (
                    <HStack my={1} space={1}>
                      <ExpenseStatusMessage
                        payer={paying}
                        expense={expense}
                        getStatusMessage={statusMessage =>
                          handleStatusMessages(statusMessage, paying.email)
                        }
                      />
                      {paid && paidAt && (
                        <Text color="white">
                          em {dayjs(paidAt).format('DD/MM/YYYY')}
                        </Text>
                      )}
                    </HStack>
                  ),
                  cardBoxProps: {
                    borderLeftColor:
                      statusMessages.find(
                        status => status.email === paying.email
                      )?.color || undefined,
                    borderLeftWidth: 4
                  }
                }
              })}
            />
          </VStack>
        </VStack>
      </ScrollView>
      {userPayer && !userPayer.paid && (
        <MarkAsPaidFab onPress={() => setOpenMarkAsPaid(true)} />
      )}
      <DeleteExpense
        expenses={[expense.id]}
        isOpen={openDelete}
        onClose={() => {
          setOpenDelete(false)
          goBack()
        }}
      />
      <MarkAsPaid
        member={selectedMember}
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
            onPress: () => setOpenDelete(true)
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
