import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface BackButtonProps {
  onPress?: () => void
}

export default function BackButton({ onPress }: BackButtonProps) {
  const { goBack } = useNavigation()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress || goBack}>
      <Feather name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
  )
}
