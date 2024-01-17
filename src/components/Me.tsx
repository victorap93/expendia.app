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
    <HStack alignItems={'center'} space={3} mx={2}>
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
      <VStack width="90%">
        {user.firstname && user.firstname && (
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <HStack>
              <Text color="white" fontSize="3xl">
                {user.firstname + ' ' + user.lastname}
              </Text>
            </HStack>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigate('Email', user)}>
          <HStack>
            <Text color="gray.200" fontSize="sm" numberOfLines={1}>
              {user.email.length > 35
                ? user.email.substring(0, 35) + '...'
                : user.email}
            </Text>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </HStack>
  )
}
