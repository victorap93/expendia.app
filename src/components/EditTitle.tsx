import React, { useState } from 'react'
import { BoxAppBar } from './AppBar'
import { Box, HStack, Input } from 'native-base'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export interface EditTitleProps {
  defaultValue: string
  onSave: (newValue: string) => void
  onClose: () => void
}

export default function EditTitle({
  defaultValue,
  onSave,
  onClose
}: EditTitleProps) {
  const [value, setValue] = useState(defaultValue)

  const save = () => {
    onSave(value)
    onClose()
  }

  return (
    <BoxAppBar>
      <HStack alignItems="center" space={2} px={4} w="full">
        <HStack w="1/6" justifyContent="flex-start">
          <IconButton
            onPress={() => onClose()}
            icon={({ size }) => <Icon name="close" color="white" size={size} />}
          />
        </HStack>
        <Input
          width="4/6"
          color="white"
          size="xl"
          borderRadius={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          borderTopWidth={0}
          borderBottomWidth={0.7}
          borderColor="white"
          _focus={{
            borderBottomWidth: 1
          }}
          value={value}
          onChangeText={setValue}
          onEndEditing={save}
        />
        <HStack w="1/6" justifyContent="center">
          <IconButton
            onPress={save}
            icon={({ size }) => <Icon name="check" color="white" size={size} />}
          />
        </HStack>
      </HStack>
    </BoxAppBar>
  )
}
