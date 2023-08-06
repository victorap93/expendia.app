import React from 'react'
import { MemberAvatar } from './MemberAvatar'
import { useAuth } from '../hooks/useAuth'
import { IconButton } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'

type Props = {}

export default function MenuButton({ }: Props) {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  return <IconButton
    onPress={() => navigate('Configurations')}
    icon={<MemberAvatar member={user} size="sm" />}
  />
}
