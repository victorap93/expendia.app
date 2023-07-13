import React from 'react'
import { Input, Text, VStack } from 'native-base'
import {
  IInputComponentType,
  IInputProps
} from 'native-base/lib/typescript/components/primitives/Input/types'

export interface TextFieldProps extends IInputProps {
  error?: string
  hideMessageError?: boolean
}

export default function TextField({
  error,
  hideMessageError,
  ...rest
}: TextFieldProps) {
  return (
    <VStack>
      <Input
        color="white"
        isInvalid={error !== undefined}
        size="xl"
        borderColor="white"
        _focus={{
          borderColor: 'violet.600',
          color: 'white'
        }}
        {...rest}
      />
      {error && !hideMessageError && <Text color="red.500">{error}</Text>}
    </VStack>
  )
}
