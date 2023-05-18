import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Box, Center, Pressable, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { publicApi } from '../lib/axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FormEmail } from './Email'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../hooks/useAuth'
import SubmitButton from '../components/SubmitButton'
import { SafeAreaView, StyleSheet } from 'react-native'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'

export interface FormValidateCode extends FormEmail {
  code: string
}

export default function ValidateCode() {
  const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      marginHorizontal: 8,
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#ffffff',
      textAlign: 'center'
    },
    focusCell: {
      borderColor: '#000'
    }
  })

  const CELL_COUNT = 6

  const { navigate } = useNavigation()
  const route = useRoute()
  const { email } = route.params as FormEmail
  const { setUser } = useAuth()
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })

  async function submit(
    values: FormValidateCode,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const response = await publicApi.post('/validate-code', values)
      if (response.data.status && response.data.token) {
        await AsyncStorage.setItem('accessToken', response.data.token)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
        navigate('Group')
      } else
        Alert.alert(
          'Ops!',
          'O código está inválido ou expirado! Tente novamente ou solicite um novo código.'
        )
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
          code: ''
        } as FormValidateCode
      }
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Formato de e-mail inválido.')
          .required('O e-mail é obrigatório.'),
        code: Yup.string().required('Digite a senha.')
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
            <Text mt={4} fontSize={28} color="white">
              Confirme o código que recebeu em seu e-mail
            </Text>
            <VStack space={8}>
              <Center mb={8}>
                <SafeAreaView style={styles.root}>
                  <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                      <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                </SafeAreaView>
              </Center>
              <Center>
                <Pressable
                  onPress={() => navigate('PasswordRecovery', { email })}
                >
                  <Text color="white" underline fontSize="md">
                    Não recebeu? Reenviar código em 60s.
                  </Text>
                </Pressable>
              </Center>
            </VStack>
          </VStack>
          <SubmitButton
            title="Entrar"
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </VStack>
      )}
    </Formik>
  )
}
