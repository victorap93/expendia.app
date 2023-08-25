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
import { useAuth } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

interface Props {
  isOpen?: boolean
  onClose?: () => void
}

export default function ConfirmLogout({ onClose, isOpen }: Props) {
  const cancelRef = useRef(null)
  const { navigate } = useNavigation()

  async function submit() {
    navigate('Logout')
    if (onClose) onClose()
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
                Logout
              </Text>
            </HStack>
            <Text color="white">
              Tem certeza que deseja desconectar sua conta do aplicativo?
            </Text>
            <Button.Group w="full" justifyContent="flex-end" space={2}>
              <Button
                variant="unstyled"
                color="white"
                onPress={onClose}
                ref={cancelRef}
              >
                <Text color="white">Cancelar</Text>
              </Button>
              <Button colorScheme="danger" onPress={submit}>
                Sair
              </Button>
            </Button.Group>
          </VStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
