import React from 'react'
import { Button, Text } from 'native-base'
import { IButtonComponentType } from 'native-base/lib/typescript/components/primitives/Button/types'

interface Props {
  handleSubmit: () => void
  isSubmitting?: boolean
  title?: string
  buttonProps?: IButtonComponentType
}

export default function SubmitButton({
  handleSubmit,
  isSubmitting,
  title = 'Continuar',
  buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
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
