import React from 'react'
import { Alert } from 'react-native'
import { Box, Button, HStack, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { api } from '../lib/axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { FormGroup } from './GroupName'
import { Plus } from 'phosphor-react-native'

export default function GroupMembers() {
  const { navigate } = useNavigation()
  const route = useRoute()
  const { title, members } = route.params as FormGroup

  async function submit(
    values: FormGroup,
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
      initialValues={{
        title,
        members
      }}
      validationSchema={Yup.object({
        members: Yup.array(
          Yup.string().email().required('Digite apenas e-mails válidos')
        ).required('Erro: Array not defined.')
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
              Gostaria de já adicionar alguém no seu grupo?
            </Text>
            <HStack space={2}>
              <Box width="4/5">
                <TextField placeholder="Adicione o e-mail no membro do grupo" />
              </Box>
              <Button
                isLoading={isSubmitting}
                onPress={() => handleSubmit()}
                bg="violet.600"
                _pressed={{
                  bg: 'violet.700'
                }}
                height={'100%'}
                width="1/5"
              >
                <Plus color="white" />
              </Button>
            </HStack>
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
