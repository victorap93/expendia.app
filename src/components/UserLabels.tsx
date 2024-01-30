import { Badge, HStack } from 'native-base'
import React from 'react'
interface Props {
  isCreator?: boolean
  isAdmin?: boolean
}

export default function UserLabels({ isCreator, isAdmin }: Props) {
  return (
    <HStack space={1} flexWrap="wrap">
      {isCreator && <Badge rounded="md">Criador</Badge>}
      {isAdmin && (
        <Badge rounded="md" colorScheme="success">
          Admin
        </Badge>
      )}
    </HStack>
  )
}
