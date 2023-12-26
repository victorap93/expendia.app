import React from 'react'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'
import { HStack, Text, VStack, Image, Box, Container } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

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
          <TouchableOpacity onPress={onSkip}>
            <Text color="white" fontSize="lg" fontFamily="body">
              Pular
            </Text>
          </TouchableOpacity>
        </HStack>
      )}
      <VStack alignItems="center" mt={!onSkip ? 16 : undefined}>
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
