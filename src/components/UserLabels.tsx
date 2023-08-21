import { Badge, HStack } from 'native-base'
import React from 'react'

interface Props {
  isCreator?: boolean
}

export default function UserLabels({ isCreator }: Props) {
  return <HStack>{isCreator && <Badge rounded="md">Criador</Badge>}</HStack>
}
