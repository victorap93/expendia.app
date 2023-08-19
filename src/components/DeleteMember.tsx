import {
  AlertDialog,
  Button,
  HStack,
  Text,
  VStack,
  useToast
} from 'native-base'
import React, { useRef } from 'react'
import { api } from '../lib/axios'
import { Alert } from 'react-native'
import { UserProps } from '../context/AuthContext'
import { GroupProps } from '../screens/Groups'
import { useAuth } from '../hooks/useAuth'

interface Props {
  isOpen?: boolean
  onClose?: (deleted?: boolean) => void
  member: UserProps
  group: GroupProps
}

export default function DeleteMember({
  onClose,
  isOpen,
  member,
  group
}: Props) {
  const cancelRef = useRef(null)
  const toast = useToast()
  const { user } = useAuth()

  async function submit() {
    try {
      const response = await api.delete(
        `/groups/${group.id}/members/${member.id}`
      )
      if (response.data.status) {
        toast.show({
          title:
            member.email === user.email ? 'Saiu do grupo!' : 'Membro removido!'
        })
      } else {
        Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
      }
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado. Tente novamente mais tarde!')
      console.log(error)
    } finally {
      if (onClose) onClose(false)
    }
  }

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Body bgColor="gray.900">
          <VStack space={4}>
            <HStack>
              <Text color="white" fontSize="lg">
                {member.email === user.email
                  ? 'Sair do grupo'
                  : 'Remover membro'}
              </Text>
            </HStack>
            <Text color="white">
              {member.email === user.email
                ? 'Tem certeza que deseja sair do grupo?'
                : 'Tem certeza que deseja remover este membro do grupo?'}
            </Text>
            <Button.Group w="full" justifyContent="flex-end" space={2}>
              <Button
                variant="unstyled"
                color="white"
                onPress={() => (onClose ? onClose(undefined) : {})}
                ref={cancelRef}
              >
                <Text color="white">Cancelar</Text>
              </Button>
              <Button colorScheme="danger" onPress={submit}>
                {member.email === user.email ? 'Sair' : 'Remover'}
              </Button>
            </Button.Group>
          </VStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
