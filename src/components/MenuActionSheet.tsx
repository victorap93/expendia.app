import React from 'react'
import { Pressable } from 'react-native'
import { Actionsheet, Box, HStack, ITextProps, Text, VStack } from 'native-base'

interface MenuItems {
  label: string
  icon?: JSX.Element
  onPress?: () => void
  textProps?: ITextProps
}

interface Props {
  title?: JSX.Element | string
  isOpen?: boolean
  onClose?: () => void
  items: MenuItems[]
}

export default function MenuActionSheet({
  isOpen,
  onClose,
  items,
  title
}: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor="gray.900">
        {title && (
          <Text fontSize="lg" color="white" mb={6}>
            {title}
          </Text>
        )}
        <VStack w="full">
          {items.map((item, index) => (
            <Pressable
              style={{
                padding: 12,
                width: '100%'
              }}
              onPress={item.onPress}
              key={index}
            >
              <HStack w="full" alignItems="center" space={2}>
                {item.icon}
                <Text
                  {...item.textProps}
                  color={item.textProps?.color || 'white'}
                  fontSize={item.textProps?.fontSize || 'lg'}
                >
                  {item.label}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
