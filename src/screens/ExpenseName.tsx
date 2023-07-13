import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import DateField from '../components/DateField'
import dayjs from 'dayjs'

export interface PayerForm {
  email: string
  cost: number
}

export interface ExpenseForm {
  title: string
  cost: number
  dueDate: string
  payers: string[]
}

export default function ExpenseName() {
  const { navigate } = useNavigation()
  const today = dayjs().format('YYYY-MM-DD')

  async function submit(
    values: ExpenseForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      // navigate('GroupMembers', {
      //   payers: values.payers || [],
      //   title: values.title.trim()
      // })
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
        title: Yup.string()
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
                  Qual o nome da despesa?
                </Text>
                <TextField
                  error={
                    touched.title && errors.title ? errors.title : undefined
                  }
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title || ''}
                  placeholder="Ex: Água, Energia, Ração..."
                />
              </Box>
              <Box>
                <Text my={4} fontSize={28} color="white">
                  Data de vencimento
                </Text>
                <DateField
                  onChangeText={handleChange('dueDate')}
                  value={values.dueDate || today}
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
