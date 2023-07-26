import { Actionsheet, VStack, Center, Text, Box, Button } from 'native-base'
import React from 'react'
import DateField from '../components/DateField'
import SubmitButton from '../components/SubmitButton'

interface Props {
  isOpen?: boolean
  onClose?: (paid?: boolean) => void
  expenses: string[]
}

export default function MarkAsPaid({ isOpen, onClose, expenses }: Props) {
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content bgColor="gray.900">
          <VStack space={6} w="full" p={4} alignItems="center">
            <Box textAlign="center">
              <Text color="white" fontSize="2xl">
                Marcar como pago
              </Text>
            </Box>
            <VStack space={3} w="full">
              <VStack alignItems="center" textAlign="center">
                <Text color="gray.400" fontSize="md">
                  Quando foi pago?
                </Text>
              </VStack>
              <DateField width="full" />
            </VStack>
            <SubmitButton
              buttonProps={{
                width: 'full'
              }}
              title="Confirmar pagamento"
              isSubmitting={false}
              handleSubmit={() => {}}
            />
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  )
}
