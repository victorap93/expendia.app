import React from 'react'
import { Alert } from 'react-native'
import {
  Badge,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { ExpenseForm, PayerForm } from './ExpenseName'
import MoneyField from '../components/MoneyField'
import TotalValue from '../components/TotalValue'
import PlusFab from '../components/PlusFab'
import { UserPlus } from 'phosphor-react-native'
import MembersList from '../components/MembersList'
import {
  convertFloatToMoney,
  convertMoneyToFloat
} from '../helpers/expenseHelper'
import { setFieldValueType } from '../lib/formik'

export default function ExpensePayers() {
  const { navigate } = useNavigation()
  const route = useRoute()
  const expense = route.params as ExpenseForm

  const currency = 'R$ '

  async function submit(
    values: ExpenseForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      navigate('ExpensePayers', {
        ...values,
        cost: values.cost.replace(currency, '')
      })
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  const getSubtotal = (payers: PayerForm[]) => {
    let subtotal = 0
    payers.map(({ cost }) => (subtotal += cost))
    return subtotal
  }

  const divideEqually = (
    values: ExpenseForm,
    setFieldValue: setFieldValueType
  ) => {
    const totalValue = convertMoneyToFloat(values.cost)
    const cost = totalValue / values.payers.length
    setFieldValue(
      'payers',
      values.payers.map(({ email }) => {
        return {
          email,
          cost
        }
      })
    )
  }

  return (
    <Formik
      initialValues={expense}
      validationSchema={Yup.object({
        cost: Yup.string()
          .notOneOf(
            [`${currency} 0,00`],
            `O valor precisa ser maior que ${currency} 0,00.`
          )
          .required('Informe o valor total da despesa.')
      })}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        setFieldValue
      }) => (
        <>
          <ScrollView>
            <VStack px={4} py={8}>
              <VStack>
                <Box my={3}>
                  <BackButton />
                </Box>
                <VStack space={2}>
                  <Box>
                    <Text my={4} fontSize={28} color="white">
                      Defina quem vão pagar e quanto cada um deve pagar
                    </Text>
                    <TotalValue expense={expense} my={3} />
                  </Box>
                  <VStack space={5}>
                    <HStack space={2} alignItems="center">
                      <Text color="white" fontSize="xl">
                        Pagantes:
                      </Text>
                      <Badge rounded="2xl">{values.payers.length}</Badge>
                    </HStack>
                    {values.payers.length > 0 && (
                      <HStack
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text color="white" fontSize="md">
                          Subtotal:{' '}
                          {convertFloatToMoney(getSubtotal(values.payers))}
                        </Text>
                        <Button
                          bgColor="gray.400"
                          _pressed={{
                            bgColor: 'gray.500'
                          }}
                          onPress={() => divideEqually(values, setFieldValue)}
                        >
                          Dividir igualmente
                        </Button>
                      </HStack>
                    )}
                    <MembersList
                      members={values.payers.map(({ email, cost }) => {
                        return {
                          email,
                          endComponent: (
                            <Text color="white">
                              {convertFloatToMoney(cost)}
                            </Text>
                          )
                        }
                      })}
                      fetchUser
                    />
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>
          <PlusFab
            bottom={150}
            icon={<UserPlus color="white" size={24} />}
            onPress={() =>
              navigate('PayingMembers', {
                id: values.group_id,
                payers: values.payers.map(({ email }) => email),
                setPayers: emails =>
                  setFieldValue(
                    'payers',
                    emails.map(email => {
                      return {
                        email,
                        cost: 0
                      }
                    })
                  )
              })
            }
          />
          <VStack px={4} py={8}>
            <SubmitButton
              title="Criar despesa"
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          </VStack>
        </>
      )}
    </Formik>
  )
}
