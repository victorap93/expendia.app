import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Box, Center, Text, VStack, useToast } from 'native-base'
import BackButton from '../components/BackButton'
import { api } from '../lib/axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import SubmitButton from '../components/SubmitButton'

export default function RequestAccountDeletion() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const submit = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/request-account-deletion')

      if (response.data?.status === true) {
        toast.show({
          title: 'Código enviado com sucesso!'
        })
        navigate('DeleteAccount')
      } else {
        Alert.alert(
          'Ops!',
          'Não foi possível solicitar a exclusão da sua conta. Tente mais tarde novamente!'
        )
      }
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não foi possível solicitar a exclusão da sua conta. Tente mais tarde novamente!'
      )
    }
  }

  return (
    <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
      <VStack>
        <Box my={3}>
          <BackButton />
        </Box>
        <Text my={4} fontSize={28} color="white">
          Solicitação de exclusão de conta
        </Text>
        <Center>
          <VStack space={2}>
            <Text color="gray.200" fontSize="md">
              Você tem o direito de excluir sua conta e todos os seus dados em
              nosso aplicativo a qualquer momento.
            </Text>
            <Text color="gray.200" fontSize="md">
              Esta ação implicará na EXCLUSÃO imediata, permanente, irreversível
              e irrecuperável de sua conta e os dados vinculados a ela em nosso
              aplicativo.
            </Text>
            <Text color="gray.200" fontSize="md">
              Você ainda poderá criar uma nova conta futuramente ou recriar a
              conta excluída caso queira.
            </Text>
            <Text color="red.500" fontSize="md">
              Ao clicar em "EXCLUIR MINHA CONTA" Um código para confirmar sua
              ação será enviado para o seu endereço de e-mail cadastrado em
              nosso aplicativo.
            </Text>
          </VStack>
        </Center>
      </VStack>
      <SubmitButton
        title="EXCLUIR MINHA CONTA"
        isSubmitting={isLoading}
        handleSubmit={submit}
        buttonProps={{
          bg: 'red.500',
          _pressed: {
            bg: 'red.700'
          }
        }}
      />
    </VStack>
  )
}
