import React from 'react'
import { Pressable } from 'react-native'
import { Actionsheet, Box, ITextProps, Text } from 'native-base'

interface MenuItems {
  label: string
  icon: JSX.Element
  onPress?: () => void
  textProps?: ITextProps
}

interface Props {
  isOpen?: boolean
  onClose?: () => void
  items: MenuItems[]
}

export default function MenuActionSheet({ isOpen, onClose, items }: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor="gray.900">
        {items.map((item, index) => (
          <Pressable
            style={{
              padding: 12,
              width: '100%'
            }}
            onPress={item.onPress}
            key={index}
          >
            <Box w="full">
              <Text
                {...item.textProps}
                color={item.textProps?.color || 'white'}
                fontSize={item.textProps?.fontSize || 'lg'}
              >
                {item.icon} {item.label}
              </Text>
            </Box>
          </Pressable>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  )
}
