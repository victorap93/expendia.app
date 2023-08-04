import React from 'react'
import PlusFab from './PlusFab'
import { CheckCircle } from 'phosphor-react-native'

type Props = {
  onPress?: () => void
}

export default function MarkAsPaidFab({ onPress }: Props) {
  return (
    <PlusFab
      onPress={onPress}
      icon={<CheckCircle weight="fill" color="white" />}
      label="Marcar como pago"
      width={200}
      bgColor="green.500"
      _pressed={{
        bgColor: 'green.800'
      }}
    />
  )
}
