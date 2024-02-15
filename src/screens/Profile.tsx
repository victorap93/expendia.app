import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack, useToast } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { api } from '../lib/axios'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import SubmitButton from '../components/SubmitButton'
import { UserProps } from '../context/AuthContext'

export default function Profile() {
  const { goBack } = useNavigation()
  const { user, setUser } = useAuth()
  const toast = useToast()

  async function submit(
    values: UserProps,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const response = await api.patch('/profile', values)
      if (response.data.status) {
        setUser(values)
        toast.show({
          title: 'Perfil alterado com sucesso!'
        })
        goBack()
      } else Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={user}
      validationSchema={Yup.object({
        firstname: Yup.string().required('Digite seu primeiro nome.'),
        lastname: Yup.string().required('Digite seu sobrenome.')
      })}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isSubmitting
      }) => (
        <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
          <VStack>
            <Box my={3}>
              <BackButton />
            </Box>
            <Text my={4} fontSize={28} color="white">
              Como podemos te chamar?
            </Text>
            <VStack space={6}>
              <TextField
                error={errors.firstname}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname || ''}
                placeholder="Digite seu primeiro nome..."
              />
              <TextField
                error={errors.lastname}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname || ''}
                placeholder="Digite seu sobrenome..."
              />
            </VStack>
          </VStack>
          <SubmitButton
            title="Salvar"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </VStack>
      )}
    </Formik>
  )
}
