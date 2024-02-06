import { AlertDialog, Button, HStack, Text, VStack } from 'native-base'
import React, { useRef } from 'react'

interface Props {
  isOpen?: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmToggleAdmin({
  onClose,
  isOpen,
  onConfirm
}: Props) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
    >
      <AlertDialog.Content bgColor="gray.900">
        <AlertDialog.CloseButton />
        <AlertDialog.Body bgColor="gray.900">
          <VStack space={4}>
            <HStack>
              <Text color="white" fontSize="md">
                Deixar administração
              </Text>
            </HStack>
            <Text color="white">
              Tem certeza que deseja DEIXAR sua função de administrador no
              grupo? Você deixará de gerenciar este grupo até que outro
              administrador te promova novamente ao cargo.
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
              <Button
                colorScheme="danger"
                onPress={() => {
                  onConfirm()
                  onClose()
                }}
              >
                Confirmar
              </Button>
            </Button.Group>
          </VStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
