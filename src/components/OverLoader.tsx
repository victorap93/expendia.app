import { AlertDialog, HStack, Text, useTheme } from 'native-base'
import React, { useRef } from 'react'
import { ActivityIndicator } from '@react-native-material/core'
import { THEME } from '../styles/theme'

interface Props {
  isLoading?: boolean
  text?: string
}

export default function OverLoader({ isLoading, text }: Props) {
  const cancelRef = useRef(null)
  const { colors } = THEME

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isLoading}>
      <AlertDialog.Content bgColor="gray.900">
        <AlertDialog.Body bgColor="gray.900">
          <HStack justifyContent="center" alignItems="center" p={0} space={4}>
            <ActivityIndicator color={colors.palette.purple} size="large" />
            <Text color="white" fontSize="sm">
              {text || 'Aguarde um momento...'}
            </Text>
          </HStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
