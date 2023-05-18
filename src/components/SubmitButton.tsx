import React from 'react'
import { Button, Text } from 'native-base'

interface Props {
  handleSubmit: () => void
  isSubmitting?: boolean
  title?: string
}

export default function SubmitButton({
  handleSubmit,
  isSubmitting,
  title = 'Continuar'
}: Props) {
  return (
    <Button
      isLoading={isSubmitting}
      onPress={() => handleSubmit()}
      bg="violet.600"
      _pressed={{
        bg: 'violet.700'
      }}
      height="12"
    >
      <Text fontSize="lg" color="white">
        {title}
      </Text>
    </Button>
  )
}
