import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { ExpenseForm } from './ExpenseName'
import MoneyField from '../components/MoneyField'
import {
  convertFloatToMoney,
  convertMoneyToFloat
} from '../helpers/expenseHelper'

export interface ExpenseCostFormProps {
  cost: string
}

export default function ExpenseCost() {
  const { navigate } = useNavigation()
  const route = useRoute()
  const expense = route.params as ExpenseForm

  const currency = 'R$ '

  async function submit(
    values: ExpenseCostFormProps,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      navigate('ExpensePayers', {
        ...expense,
        cost: convertMoneyToFloat(values.cost)
      })
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        cost: expense.cost ? convertFloatToMoney(expense.cost) : '0,00'
      }}
      validationSchema={Yup.object({
        cost: Yup.string()
          .test(
            'min',
            `O valor precisa ser maior que ${currency}0,00.`,
            cost => convertMoneyToFloat(cost || '0') > 0.0
          )
          .required('Informe o valor total da despesa.')
      })}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
      {({ setFieldValue, handleSubmit, values, errors, isSubmitting }) => (
        <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
          <VStack>
            <Box my={3}>
              <BackButton />
            </Box>
            <VStack space={2}>
              <Box>
                <Text my={4} fontSize={28} color="white">
                  Qual é o valor total da despesa?
                </Text>
                <MoneyField
                  error={errors.cost}
                  onChangeText={value => setFieldValue('cost', value)}
                  value={values.cost}
                  fontSize={40}
                  onEndEditing={() => handleSubmit()}
                />
              </Box>
            </VStack>
          </VStack>
          <SubmitButton
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </VStack>
      )}
    </Formik>
  )
}
