import React from 'react'
import { Button, Text } from 'native-base'
import { InterfaceButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types'

interface Props {
  handleSubmit: () => void
  isSubmitting?: boolean
  title?: string
  buttonProps?: InterfaceButtonProps
  disabled?: boolean
}

export default function SubmitButton({
  handleSubmit,
  isSubmitting,
  title = 'Continuar',
  buttonProps,
  disabled
}: Props) {
  return (
    <Button
      {...buttonProps}
      disabled={disabled}
      isLoading={isSubmitting}
      onPress={() => handleSubmit()}
      bg={disabled ? 'trueGray.900' : buttonProps?.bg || 'violet.600'}
      opacity={disabled ? 60 : undefined}
      _pressed={
        buttonProps?._pressed || {
          bg: 'violet.700'
        }
      }
      height="12"
    >
      <Text fontSize="lg" color="white">
        {title}
      </Text>
    </Button>
  )
}
