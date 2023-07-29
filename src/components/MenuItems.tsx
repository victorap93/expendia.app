import React from 'react'
import { Box, Button, Center, HStack, Text, VStack } from 'native-base'
import { GestureResponderEvent } from 'react-native'

type GroupItemsProps = {
  name: string
  children: JSX.Element | JSX.Element[]
}

export function GroupItems({ name, children }: GroupItemsProps) {
  return <VStack>
    <Box w="100%" h={60} px={4} justifyContent="center">
      <Text fontSize="16" color="gray.500" _dark={{
        color: "gray.300"
      }}>
        {name}
      </Text>
    </Box>
    {children}
  </VStack>
}

type ListItemProps = {
  title: string
  subTitle?: string
  left?: JSX.Element
  right?: JSX.Element
  onPress?: (event: GestureResponderEvent) => void
}

export function ListItem({ title, subTitle, left, right, onPress }: ListItemProps) {
  return <Button justifyContent='flex-start' rounded={'none'} backgroundColor='#000' _pressed={{ backgroundColor: '#333' }} onPress={onPress}>
    <HStack space={3} alignItems="center">
      {left && <Center minWidth={'30px'}>{left}</Center>}
      <VStack flexGrow={1} marginLeft={left ? '0' : '30px'}>
        <Text color="white" fontSize={20}>{title}</Text>
        {subTitle && <Text color="white" fontSize={12} opacity={0.6}>{subTitle}</Text>}
      </VStack>
      {right && <Center w={'30px'}>{right}</Center>}
    </HStack>
  </Button>
}
