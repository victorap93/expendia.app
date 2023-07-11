import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { api } from '../lib/axios'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'

export interface GroupForm {
  title: string
  members: string[]
}

export default function GroupName() {
  const { navigate } = useNavigation()

  async function submit(
    values: GroupForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      navigate('GroupMembers', {
        members: values.members || [],
        title: values.title.trim()
      })
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{} as GroupForm}
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Digite o nome do grupo.')
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
        isSubmitting
      }) => (
        <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
          <VStack>
            <Box my={3}>
              <BackButton />
            </Box>
            <Text my={4} fontSize={28} color="white">
              Comece dando um nome para o seu grupo
            </Text>
            <VStack>
              <TextField
                error={errors.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title || ''}
                placeholder="Qual o nome do seu grupo?"
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
