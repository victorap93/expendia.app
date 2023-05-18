import React from 'react'
import { Alert } from 'react-native'
import { Box, Center, Pressable, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { publicApi } from '../lib/axios'
import { useNavigation, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../hooks/useAuth'
import { FormSignUp } from './SignUp'
import SubmitButton from '../components/SubmitButton'

export interface FormProfile {
  firstname: string
  lastname: string
  avatarUrl?: string
}

interface FormRegister extends FormProfile, FormSignUp {}

export default function Register() {
  const { navigate } = useNavigation()
  const route = useRoute()
  const { email, password, confirmPassword } = route.params as FormSignUp
  const { setUser } = useAuth()

  async function submit(
    values: FormRegister,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const response = await publicApi.post('/sign-up', values)
      if (response.data.status && response.data.token) {
        await AsyncStorage.setItem('accessToken', response.data.token)
        await AsyncStorage.setItem('user', JSON.stringify(values))
        setUser(values)
        navigate('Group')
      } else Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={
        {
          email,
          password,
          confirmPassword,
          firstname: '',
          lastname: ''
        } as FormRegister
      }
      validationSchema={Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required(),
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
            <VStack space={2}>
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
              <Center>
                <Pressable>
                  <Text color="white" fontSize="md">
                    Protegemos e respeitamos seus dados de acordo com a lei
                    geral de proteção de dados e com nossa{' '}
                    <Text color="white" bold underline fontSize="md">
                      política de privacidade
                    </Text>
                    .
                  </Text>
                </Pressable>
              </Center>
            </VStack>
          </VStack>
          <SubmitButton
            title="Criar conta"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </VStack>
      )}
    </Formik>
  )
}
