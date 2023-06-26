import { Box } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React from 'react'

export default function CardBox({ children, ...rest }: InterfaceBoxProps) {
  return (
    <Box bg="dark.200" rounded="xl" width="full" {...rest}>
      {children}
    </Box>
  )
}
