import React from 'react'
import CardBox from './CardBox'
import { HStack, Text, VStack } from 'native-base'
import { UserProps } from '../context/AuthContext'
import { MemberAvatar } from './MemberAvatar'

interface CardMemberProps {
  member: UserProps
  fetchUser?: boolean
}

export default function CardMember({ member, fetchUser }: CardMemberProps) {
  return (
    <CardBox p={3}>
      <HStack alignItems="center" space={3}>
        <MemberAvatar member={member} size="sm" />
        <VStack>
          <Text color="white" fontSize="md">
            {member.firstname
              ? `${member.firstname} ${member.lastname || ''}`
              : member.email}
          </Text>
          {member.firstname && (
            <Text color="gray.200" fontSize="sm">
              {member.email}
            </Text>
          )}
        </VStack>
      </HStack>
    </CardBox>
  )
}
