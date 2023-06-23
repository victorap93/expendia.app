import { Box, HStack, Text, VStack } from 'native-base'
import React, { ReactNode } from 'react'
import BackButton from './BackButton'
import MenuButton from './MenuButton'

interface AppBarProps {
  title: string | ReactNode
  left?: 'menu' | 'back'
  right?: ReactNode
  bottom?: ReactNode
}

export default function AppBar({ title, left, right, bottom }: AppBarProps) {
  return (
    <Box px={4} pb={4} pt={12} roundedBottom={24} bg="dark.200" width="full">
      <VStack justifyContent="space-between">
        <HStack justifyContent="space-between" alignItems="center">
          <Box>
            {left ? left === 'back' ? <BackButton /> : <MenuButton /> : ''}
          </Box>
          <Text fontSize="lg" color="white">
            {title}
          </Text>
          <Box>{right}</Box>
        </HStack>
        {bottom}
      </VStack>
    </Box>
  )
}
