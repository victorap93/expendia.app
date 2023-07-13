import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack, useTheme } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { ExpenseForm } from './ExpenseName'
import { TextInputMask } from 'react-native-masked-text'
import MoneyField from '../components/MoneyField'

export default function ExpenseCost() {
  const { navigate } = useNavigation()
  const { colors } = useTheme()

  async function submit(
    values: ExpenseForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{} as ExpenseForm}
      validationSchema={Yup.object({
        cost: Yup.string()
          .required('Digite o nome da despesa.')
          .min(2, 'Digite no mínimo 2 caracteres.')
          .max(50, 'Digite no máximo 50 caracteres.')
      })}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting
      }) => (
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
                  onChangeText={handleChange('cost')}
                  value={values.cost || '0'}
                  fontSize={40}
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
