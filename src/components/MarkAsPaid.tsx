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
import React, { useState } from 'react'
import { Alert } from 'react-native'
import DateField from './DateField'
import SubmitButton from './SubmitButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { api } from '../lib/axios'
import { UserProps } from '../context/AuthContext'
import dayjs from 'dayjs'
import { MemberSelect } from './MemberSelect'
import { Pressable } from '@react-native-material/core'
import { ArrowsLeftRight } from 'phosphor-react-native'
import { ExpenseProps } from '../screens/Expenses'

export type PaymentType = {
  paid: boolean
  paidAt?: string | null
  paying: UserProps
}

interface Props {
  isOpen?: boolean
  onClose?: (payment?: PaymentType) => void
  expenses: ExpenseProps[]
  member: UserProps
  members: UserProps[]
  unmark?: boolean
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
  members,
  unmark
}: Props) {
  const toast = useToast()
  const [isUnmark, setIsUnmark] = useState<boolean | undefined>(unmark)

  async function submit(
    values: MarkAsPaidForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      const payload = {
        ...values,
        paid: !isUnmark,
        paidAt:
          values.paidAt && !isUnmark ? dayjs(values.paidAt).format() : null
      }
      setSubmitting(true)
      const promises = expenses.map(expense => {
        if (
          expense.Paying.find(({ paying }) => paying.email === values.email)
        ) {
          api.patch(`/expenses/${expense.id}`, payload)
        }
      })
      Promise.all(promises)
        .then(() => {
          toast.show({
            title: isUnmark ? 'Pagamento desmarcado!' : 'Pago com sucesso!'
          })
          const paying = members.find(({ email }) => email === values.email)!
          if (onClose)
            onClose({
              ...payload,
              paying
            })
        })
        .catch(error => {
          Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
          console.error('Error:', error.message)
          if (onClose) onClose()
        })
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
      if (onClose) onClose()
      console.log(error)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          paid: !unmark,
          paidAt: unmark ? undefined : dayjs().format(),
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
                <Pressable
                  style={{
                    padding: 4,
                    width: '100%'
                  }}
                  onPress={() => setIsUnmark(!isUnmark)}
                >
                  <HStack
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    space={2}
                    w="full"
                  >
                    <Text color="white" fontSize="2xl">
                      {!isUnmark ? 'Marcar como pago' : 'Desmarcar pagamento'}
                    </Text>
                    <ArrowsLeftRight color="white" />
                  </HStack>
                </Pressable>
                <MemberSelect
                  memberSelected={
                    members.find(({ email }) => email === values.email) || {
                      email: values.email
                    }
                  }
                  members={members}
                  onChange={member => setFieldValue('email', member.email)}
                />
                {!isUnmark && (
                  <VStack space={3} w="full">
                    <Text color="gray.400" fontSize="md">
                      Quando foi pago?
                    </Text>
                    <DateField
                      onChangeText={handleChange('paidAt')}
                      value={values.paidAt}
                    />
                  </VStack>
                )}
                <SubmitButton
                  buttonProps={{
                    width: 'full'
                  }}
                  title={
                    isSubmitting
                      ? 'Carregando...'
                      : isUnmark
                      ? 'Desmarcar pagamento'
                      : 'Confirmar pagamento'
                  }
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
