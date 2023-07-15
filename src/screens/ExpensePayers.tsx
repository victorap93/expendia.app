import React from 'react'
import { Alert } from 'react-native'
import { Badge, Box, HStack, ScrollView, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { ExpenseForm } from './ExpenseName'
import MoneyField from '../components/MoneyField'
import TotalValue from '../components/TotalValue'
import PlusFab from '../components/PlusFab'
import { UserPlus } from 'phosphor-react-native'
import MembersList from '../components/MembersList'

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
                  <VStack space={4}>
                    <HStack space={2} alignItems="center">
                      <Text color="white" fontSize="xl">
                        Pagantes:
                      </Text>
                      <Badge rounded="2xl">{values.payers.length}</Badge>
                    </HStack>
                    <MembersList
                      members={values.payers.map(({ email, cost }) => {
                        return {
                          email,
                          endComponent: (
                            <Text color="white">{cost || 'R$ 0,00'}</Text>
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
                        cost: ''
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
