import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { publicApi } from '../lib/axios'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'

export interface FormEmail {
  email: string
}

export default function Email() {
  const { navigate } = useNavigation()

  async function submit(
    values: FormEmail,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const response = await publicApi.post('/sign-in', {
        ...values,
        password: ''
      })
      if (response.data.hasOwnProperty('error')) {
        switch (response.data.error) {
          case 'INVALID_PASSWORD':
            navigate('SignIn', values)
            break
          case 'USER_DOES_NOT_EXIST':
            navigate('SignUp', values)
            break
          default:
            Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
            break
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{} as FormEmail}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Formato de e-mail inválido.')
          .required('O e-mail é obrigatório.')
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
              Comece com seu e-mail
            </Text>
            <VStack>
              <TextField
                error={errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email || ''}
                placeholder="Digite seu email favorito..."
              />
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
