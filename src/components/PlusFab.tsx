import React from 'react'
import { Fab, IFabProps } from 'native-base'
import { Plus } from 'phosphor-react-native'

export default function PlusFab({ ...rest }: IFabProps) {
  return (
    <Fab
      {...rest}
      bgColor={rest.bgColor || 'violet.600'}
      _pressed={
        rest._pressed || {
          bgColor: 'violet.700'
        }
      }
      renderInPortal={rest.renderInPortal || false}
      shadow={rest.shadow || 2}
      right={rest.right || 5}
      bottom={rest.bottom || 60}
      size={rest.size || 16}
      icon={rest.icon || <Plus color="white" size={24} />}
    />
  )
}
