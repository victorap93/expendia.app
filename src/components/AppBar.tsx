import { Box, HStack, Text, VStack } from 'native-base'
import React, { ReactNode, useState } from 'react'
import BackButton from './BackButton'
import MenuButton from './MenuButton'
import { TouchableOpacity } from 'react-native'
import { CaretCircleDown, CaretCircleUp } from 'phosphor-react-native'

interface BoxAppBarProps {
  children: ReactNode
}

interface AppBarProps {
  title?: string | ReactNode
  onPress?: () => void
  center?: ReactNode
  left?: 'menu' | 'back'
  right?: ReactNode
  bottom?: ReactNode
}

export function BoxAppBar({ children }: BoxAppBarProps) {
  return (
    <Box pb={4} pt={12} roundedBottom={24} bg="dark.200" width="full">
      {children}
    </Box>
  )
}

export default function AppBar({
  title,
  onPress,
  center,
  left,
  right,
  bottom
}: AppBarProps) {
  const [openBottom, setOpenBottom] = useState(bottom ? true : false)

  return (
    <>
      <BoxAppBar>
        <VStack justifyContent="space-between" space={2}>
          <HStack justifyContent="space-between" alignItems="center" px={4}>
            <Box width="1/4">
              {left ? (
                left === 'back' ? (
                  <BackButton onPress={onPress} />
                ) : (
                  <MenuButton />
                )
              ) : (
                ''
              )}
            </Box>
            {center || (
              <HStack width="1/2" textAlign="center" justifyContent="center">
                <Text fontSize="lg" color="white">
                  {title}
                </Text>
              </HStack>
            )}
            <HStack width="1/4" justifyContent="flex-end">
              {right}
            </HStack>
          </HStack>
          {openBottom && bottom}
        </VStack>
      </BoxAppBar>
      {bottom && (
        <HStack justifyContent="center" marginTop={'-12.5px'}>
          <TouchableOpacity onPress={() => setOpenBottom(!openBottom)}>
            {openBottom ? (
              <CaretCircleUp weight="fill" color="white" />
            ) : (
              <CaretCircleDown weight="fill" color="white" />
            )}
          </TouchableOpacity>
        </HStack>
      )}
    </>
  )
}
