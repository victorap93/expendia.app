import React from 'react'
import { Fab, IFabProps } from 'native-base'
import { Plus } from 'phosphor-react-native'

export default function PlusFab({ ...rest }: IFabProps) {
  return (
    <Fab
      {...rest}
      bgColor="violet.600"
      _pressed={{
        bgColor: 'violet.700'
      }}
      renderInPortal={false}
      shadow={2}
      right={5}
      bottom={60}
      size={16}
      icon={<Plus color="white" size={24} />}
    />
  )
}
