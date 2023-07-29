import React from 'react'
import { Box, Text, VStack } from 'native-base'
import BackButton from '../components/BackButton'

export interface GroupForm {
  title: string
  members: string[]
}

export default function ConfigurationsUser() {
  return <VStack flex={1} space={2} px={4} py={8} justifyContent="space-between">
    <VStack>
      <Box my={3}>
        <BackButton />
      </Box>
      <Text color={'white'}>ConfigurationsUser</Text>
    </VStack>
  </VStack>
}
