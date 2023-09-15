import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { HStack, Text, VStack, Image } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export interface IntroProps {
  index?: number
  title: string
  description: string
  imageSource: ImageSourcePropType
  bgColor: ColorType
  onSkip?: () => void
}

export default function Intro({
  title,
  description,
  imageSource,
  bgColor,
  onSkip
}: IntroProps) {
  return (
    <VStack space={2} h="full" bgColor={bgColor} py={12} px={4}>
      {onSkip && (
        <HStack w="full" justifyContent="flex-end">
          <IconButton
            style={{
              backgroundColor: '#AAA',
              opacity: 0.6
            }}
            onPress={onSkip}
            icon={({ size }) => <Icon name="close" color="#ddd" size={size} />}
          />
        </HStack>
      )}
      <VStack alignItems="center">
        <Text color="white" fontSize="4xl" fontFamily="heading">
          {title}
        </Text>
        <Image source={imageSource} alt="Banner of intro" size={400} />
        <Text color="white" fontSize="lg" fontFamily="body">
          {description}
        </Text>
      </VStack>
    </VStack>
  )
}
