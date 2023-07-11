import React from 'react'
import { Alert } from 'react-native'
import {
  Badge,
  Box,
  Button,
  ChevronRightIcon,
  HStack,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import BackButton from '../components/BackButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'
import { FormGroup } from './GroupName'
import { Plus, Trash } from 'phosphor-react-native'
import { setFieldValueType } from '../lib/formik'
import { useAuth } from '../hooks/useAuth'
import MembersList from '../components/MembersList'
import { IconButton, Pressable } from '@react-native-material/core'
import { api } from '../lib/axios'

interface FormGroupMembers extends FormGroup {
  email: string
}

type ErrorsEmail = {
  email?: string
}

export default function GroupMembers() {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const route = useRoute()
  const { title, members } = route.params as FormGroup

  async function submit(
    values: FormGroupMembers,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    try {
      setSubmitting(true)
      const response = await api.post('/groups', values)
      if (response.data.status && response.data.group_id) {
        navigate('Expenses', {
          ...values,
          Member: values.members.map(email => {
            return {
              createdAt: '',
              member: { email }
            }
          }),
          id: response.data.group_id
        })
      } else {
        Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
      }
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
    } finally {
      setSubmitting(false)
    }
  }

  const isDisabled = (errors: ErrorsEmail, values: FormGroupMembers) => {
    return errors.email !== undefined || values.email.trim() === ''
  }

  const addMember = (
    values: FormGroupMembers,
    setFieldValue: setFieldValueType
  ) => {
    if (values.email === user.email) {
      return Alert.alert(
        'Ação incorreta!',
        'Você já é automaticamente um membro do grupo.'
      )
    }

    if (values.members.includes(values.email)) {
      return Alert.alert(
        'Membro já adicionado!',
        'Este membro já foi adicionado ao grupo.'
      )
    }

    setFieldValue('email', '')
    setFieldValue('members', [...values.members, values.email.toLowerCase()])
  }

  return (
    <Formik
      initialValues={{
        title,
        members,
        email: ''
      }}
      validationSchema={Yup.object({
        members: Yup.array(
          Yup.string().email('Digite apenas e-mails válidos')
        ).required('Erro: Array not defined.'),
        email: Yup.string().email('E-mail inválido.')
      })}
      onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue
      }) => (
        <VStack
          flex={1}
          space={2}
          minH="full"
          px={4}
          py={8}
          justifyContent="space-between"
        >
          <VStack space={8}>
            <VStack>
              <Box my={3}>
                <BackButton />
              </Box>
              <Text fontSize={28} color="white">
                Gostaria de já adicionar alguém no seu grupo?
              </Text>
            </VStack>
            <VStack>
              <HStack space={2}>
                <Box width="4/5">
                  <TextField
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    hideMessageError
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="E-mail do membro"
                    value={values.email || ''}
                  />
                </Box>
                <Button
                  disabled={isDisabled(errors, values)}
                  isLoading={isSubmitting}
                  onPress={() =>
                    isDisabled(errors, values)
                      ? {}
                      : addMember(values, setFieldValue)
                  }
                  bg={
                    isDisabled(errors, values) ? 'trueGray.900' : 'violet.600'
                  }
                  _pressed={{
                    bg: 'violet.700'
                  }}
                  height={'100%'}
                  width="1/5"
                >
                  <Plus color={isDisabled(errors, values) ? 'gray' : 'white'} />
                </Button>
              </HStack>
              {errors.email && <Text color="red.500">{errors.email}</Text>}
            </VStack>
            <VStack>
              <Box>
                <Pressable
                  style={{
                    padding: 4
                  }}
                  onPress={() =>
                    navigate('RecentMembers', {
                      members: values.members,
                      setMembers: emails => setFieldValue('members', emails)
                    })
                  }
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text color="white" textTransform="uppercase">
                      Ver membros recentes
                    </Text>
                    <ChevronRightIcon color="white" />
                  </HStack>
                </Pressable>
              </Box>
            </VStack>
            <VStack space={4}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="xl">
                  Membros:
                </Text>
                <Badge rounded="2xl">{values.members.length + 1}</Badge>
              </HStack>
              <MembersList
                members={values.members.map(email => {
                  return {
                    email,
                    endComponent: (
                      <IconButton
                        onPress={() =>
                          setFieldValue(
                            'members',
                            values.members.filter(
                              memberEmail => memberEmail !== email
                            )
                          )
                        }
                        icon={({ size }) => <Trash color="white" size={size} />}
                      />
                    )
                  }
                })}
                autoInclude
                fetchUser
              />
            </VStack>
          </VStack>
          <Box my={8}>
            <SubmitButton
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          </Box>
        </VStack>
      )}
    </Formik>
  )
}
