import React from 'react'
import { Box, Center, HStack, Text, VStack } from 'native-base'
import { GestureResponderEvent } from 'react-native'
import { Pressable } from '@react-native-material/core'

type GroupItemsProps = {
  name: string
  children: JSX.Element | JSX.Element[]
}

export function GroupItems({ name, children }: GroupItemsProps) {
  return <VStack>
    <Box w="100%" h={45} px={4} justifyContent="center">
      <Text fontSize="16" color="gray.500" _dark={{ color: "gray.300" }}>
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
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export function ListItem({ title, subTitle, left, right, disabled = false, onPress }: ListItemProps) {
  return <Pressable
    onPress={onPress}
    android_ripple={{ color: '#222' }}
    style={{ padding: 10 }}
    disabled={disabled}>
    <HStack space={3} alignItems="center">
      {left && <Center minWidth={'30px'}>{left}</Center>}
      <VStack flexGrow={1} marginLeft={left ? '0' : '30px'}>
        <Text color="white" fontSize={20} opacity={disabled ? 0.5 : 1}>{title}</Text>
        {subTitle && <Text color="white" fontSize={12} opacity={disabled ? 0.3 : 0.6}>{subTitle}</Text>}
      </VStack>
      {right && <Center w={'30px'}>{right}</Center>}
    </HStack>
  </Pressable>
}
