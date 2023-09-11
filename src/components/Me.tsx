import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text, VStack } from 'native-base'
import { MemberAvatar } from './MemberAvatar'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { Pencil } from 'phosphor-react-native'

interface Props {
  onPressOnAvatar: () => void
}

export default function Me({ onPressOnAvatar }: Props) {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  return (
    <HStack alignItems={'center'} space={3} ml={2}>
      <TouchableOpacity onPress={onPressOnAvatar}>
        <MemberAvatar
          member={user}
          size="lg"
          badge={<Pencil size={20} />}
          badgeProps={{
            bg: 'white',
            size: '6',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </TouchableOpacity>
      <VStack>
        {user.firstname && user.firstname && (
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <Text color="white" fontSize="3xl">
              {user.firstname + ' ' + user.lastname}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigate('Email')}>
          <Text color="gray.200" fontSize="sm">
            {user.email}
          </Text>
        </TouchableOpacity>
      </VStack>
    </HStack>
  )
}
