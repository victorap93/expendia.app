import { Text, VStack } from 'native-base'
import React from 'react'

interface Props {
  message: string
}

export default function EmptyMessage({ message }: Props) {
  return (
    <VStack space={4}>
      <Text color="gray.500" textAlign="center" fontSize="lg">
        {message}
      </Text>
    </VStack>
  )
}
