import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import ListItem from '../components/ListItem'
import { Feather } from '@expo/vector-icons'

export interface GroupForm {
  title: string
  members: string[]
}

export default function Configurations() {
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
            <VStack space={3}>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text fontSize="16" color="gray.500" _dark={{
                  color: "gray.300"
                }}>
                  Configurações
                </Text>
              </Box>
              <ListItem
                title="Usuario"
                subTitle="Gerencie sua foto, nome e informações pessoais"
                left={<Feather name="user" size={24} color="white" />}
                right={<Feather name="arrow-right" size={24} color="white" />}
              />
              <ListItem
                title="Aplicativo"
                subTitle="Tema, notificações e segurança"
                left={<Feather name="settings" size={24} color="white" />}
                right={<Feather name="arrow-right" size={24} color="white" />}
              />
            </VStack>
          </VStack>
          {/* <SubmitButton
            title='Desconectar'
            buttonProps={
              { bg: 'red.700' }
            }
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          /> */}
        </VStack>
      )}
    </Formik>
  )
}
