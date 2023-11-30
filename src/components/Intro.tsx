import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { HStack, Text, VStack, Image, Box, Container } from 'native-base'
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
    <VStack space={1} h="full" bgColor={bgColor} py={12}>
      {onSkip && (
        <HStack p={4} w="full" justifyContent="flex-end">
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
        <Container>
          <Text color="white" fontSize="3xl" fontFamily="heading">
            {title}
          </Text>
        </Container>
        <Image
          source={imageSource}
          alt="Banner of intro"
          width="100%"
          height="70%"
        />
        <Container>
          <Text color="white" fontSize="lg" fontFamily="body">
            {description}
          </Text>
        </Container>
      </VStack>
    </VStack>
  )
}
