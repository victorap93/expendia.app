import {
  Actionsheet,
  VStack,
  Center,
  Text,
  Box,
  Button,
  useToast,
  HStack
} from 'native-base'
import React from 'react'
import { Alert } from 'react-native'
import DateField from '../components/DateField'
import SubmitButton from '../components/SubmitButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { api } from '../lib/axios'
import { UserProps } from '../context/AuthContext'
import dayjs from 'dayjs'
import { MemberSelect } from '../components/MemberSelect'

interface Props {
  isOpen?: boolean
  onClose?: (paid?: boolean) => void
  expenses: string[]
  member: UserProps
  members: UserProps[]
}

export interface MarkAsPaidForm {
  paid: boolean
  paidAt: string
  email: string
}

export default function MarkAsPaid({
  isOpen,
  onClose,
  expenses,
  member,
  members
}: Props) {
  const toast = useToast()

  async function submit(
    values: MarkAsPaidForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const promises = expenses.map(expense =>
        api.patch(`/expenses/${expense}`, {
          ...values,
          paidAt: values.paidAt ? dayjs(values.paidAt).format() : undefined
        })
      )
      Promise.all(promises)
        .then(() => {
          toast.show({
            title: 'Pago com sucesso!'
          })
          if (onClose) onClose(true)
        })
        .catch(error => {
          Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
          console.error('Error:', error.message)
          if (onClose) onClose(false)
        })
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
      if (onClose) onClose(false)
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={
        {
          paid: true,
          paidAt: dayjs().format(),
          email: member.email
        } as MarkAsPaidForm
      }
      validationSchema={Yup.object({
        paid: Yup.boolean().required(),
        paidAt: Yup.string().required(),
        email: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        submit(values, setSubmitting)
      }}
    >
      {({
        handleChange,
        setFieldValue,
        handleSubmit,
        values,
        isSubmitting
      }) => (
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
            <Actionsheet.Content bgColor="gray.900">
              <VStack space={6} w="full" p={4} alignItems="center">
                <Box textAlign="center">
                  <Text color="white" fontSize="2xl">
                    Marcar como pago
                  </Text>
                </Box>
                <MemberSelect
                  memberSelected={
                    members.find(({ email }) => email === values.email) || {
                      email: values.email
                    }
                  }
                  members={members}
                  onChange={member => setFieldValue('email', member.email)}
                />
                <VStack space={3} w="full">
                  <Text color="gray.400" fontSize="md">
                    Quando foi pago?
                  </Text>
                  <DateField
                    onChangeText={handleChange('paidAt')}
                    value={values.paidAt}
                  />
                </VStack>
                <SubmitButton
                  buttonProps={{
                    width: 'full'
                  }}
                  title={isSubmitting ? 'Carregando...' : 'Confirmar pagamento'}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              </VStack>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      )}
    </Formik>
  )
}
