import React, { useEffect, useState } from 'react'
import CardBox from './CardBox'
import { HStack, Text, VStack } from 'native-base'
import { UserProps } from '../context/AuthContext'
import { MemberAvatar } from './MemberAvatar'
import { api } from '../lib/axios'

interface CardMemberProps {
  member: UserProps
  fetchUser?: boolean
}

export default function CardMember({ member, fetchUser }: CardMemberProps) {
  const [user, setUser] = useState<UserProps | undefined>()

  async function getUser() {
    try {
      const response = await api.get(`/user/${member.email}`)
      if (response.status !== 404) setUser(response.data.user || member)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setUser({ ...member })
    if (fetchUser) getUser()

    return () => setUser(undefined)
  }, [member])

  return user ? (
    <CardBox p={3}>
      <HStack alignItems="center" space={3}>
        <MemberAvatar member={user} size="sm" />
        <VStack>
          <Text color="white" fontSize="md">
            {user.firstname
              ? `${user.firstname} ${user.lastname || ''}`
              : user.email}
          </Text>
          {user.firstname && (
            <Text color="gray.200" fontSize="sm">
              {user.email}
            </Text>
          )}
        </VStack>
      </HStack>
    </CardBox>
  ) : (
    <></>
  )
}
