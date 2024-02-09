import React, { useState, useEffect, useMemo } from 'react'
import { Badge, HStack, ScrollView, Text, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '../lib/axios'
import { Alert, RefreshControl, TouchableOpacity } from 'react-native'
import AppBar from '../components/AppBar'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { GroupProps } from './Groups'
import MarkAsPaid from '../components/MarkAsPaid'
import { useAuth } from '../hooks/useAuth'
import { ExpenseProps } from './Expenses'
import MenuActionSheet from '../components/MenuActionSheet'
import TotalValue from '../components/TotalValue'
import dayjs from 'dayjs'
import MembersList, { MemberProps } from '../components/MembersList'
import { convertFloatToMoney, getExpenseForm } from '../helpers/expenseHelper'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from '../components/ExpenseStatusMessage'
import PayerSplitProgress from '../components/PayerSplitProgress'
import MarkAsPaidFab from '../components/MarkAsPaidFab'
import DeleteExpense from '../components/DeleteExpense'
import DuplicateExpense from '../components/DuplicateExpense'
import EditExpenseTitle from '../components/EditExpenseTitle'

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
  const [_, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute()
  const { group, expense: expenseParam } = route.params as ExpenseDetails
  const [expense, setExpense] = useState<ExpenseProps>(expenseParam)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const expenseForm = getExpenseForm(expense, group)
  const [statusMessages, setStatusMessages] = useState<
    ExpenseStatusMessageSetupPayer[]
  >([])
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [selectedMember, setSelectedMember] = useState<MemberProps>(
    expense.Paying.find(({ paying }) => paying.email === user.email)
      ? user
      : expense.Paying[0].paying
  )
  const userPayer = expense.Paying.find(
    ({ paying }) => paying.email === user.email
  )
  const [editExpenseTitle, setEditExpenseTitle] = useState(false)
  const me = useMemo(() => {
    const teste = group.Member.find(
      groupMember => groupMember.member.id === user.id
    )
    console.log(teste)
    return teste
  }, [group])

  const getExpense = async (loading = true) => {
    try {
      setIsLoading(loading)
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
      {editExpenseTitle ? (
        <EditExpenseTitle
          group={group}
          expense={expense}
          setExpense={setExpense}
          onClose={() => setEditExpenseTitle(false)}
        />
      ) : (
        <AppBar
          center={
            <TouchableOpacity
              onPress={() => setEditExpenseTitle(true)}
              style={{ width: '50%' }}
            >
              <HStack textAlign="center" justifyContent="center">
                <Text fontSize="lg" color="white">
                  {expense.title}
                </Text>
              </HStack>
            </TouchableOpacity>
          }
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
      )}
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
                Pagantes: {me?.isAdmin ? 'Admin' : 'User '}
              </Text>
              <Badge rounded="2xl">{expense.Paying.length}</Badge>
            </HStack>
            <MembersList
              onPress={member => {
                if (me?.isAdmin || member.id === user.id) {
                  setSelectedMember(member)
                  setOpenMarkAsPaid(true)
                }
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
                  slots: {
                    cardBox: {
                      borderLeftColor:
                        statusMessages.find(
                          status => status.email === paying.email
                        )?.color || undefined,
                      borderLeftWidth: 4
                    }
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
        isAdmin={me?.isAdmin || undefined}
        isOpen={openMarkAsPaid}
        onClose={payment => {
          setOpenMarkAsPaid(false)
          if (payment) {
            setExpense(prevState => {
              const payerIndex = prevState.Paying.findIndex(
                ({ paying }) => paying.email === payment.paying.email
              )
              const paying = prevState.Paying[payerIndex]
              prevState.Paying[payerIndex] = {
                ...paying,
                ...payment
              }
              return { ...prevState }
            })
            setTimeout(() => getExpense(false), 2000)
          }
        }}
        expenses={[expense]}
      />
      <DuplicateExpense
        expenses={[expenseForm]}
        isOpen={openDuplicate}
        onClose={() => setOpenDuplicate(false)}
      />
      <MenuActionSheet
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        items={[
          {
            icon: <Icon color="white" name="pencil" size={20} />,
            label: 'Editar',
            onPress: editExpense
          },
          {
            icon: <Icon color="white" name="delete" size={20} />,
            label: 'Excluir',
            onPress: () => setOpenDelete(true)
          },
          {
            icon: <Icon color="white" name="content-copy" size={20} />,
            label: 'Duplicar',
            onPress: () => {
              setOpenMenu(false)
              setOpenDuplicate(true)
            }
          }
        ]}
      />
    </>
  )
}
