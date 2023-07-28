import React from 'react'
import { Center, HStack, Text, VStack } from 'native-base'

type Props = {
  title: string
  subTitle?: string
  left?: JSX.Element
  right?: JSX.Element
}

export default function ListItem({ title, subTitle, left, right }: Props) {
  return <HStack space={3} alignItems="center">
    <Center w={'30px'}>{left}</Center>
    <VStack flexGrow={1}>
      <Text color="white" fontSize={20}>{title}</Text>
      {subTitle && <Text color="white" fontSize={12} opacity={0.6}>{subTitle}</Text>}
    </VStack>    
    <Center w={'30px'}>{right}</Center>
  </HStack>;
}
