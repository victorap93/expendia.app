import React, { ReactElement, useEffect, useState } from 'react'
import CardBox from './CardBox'
import { HStack, Skeleton, Text, VStack } from 'native-base'
import { UserProps } from '../context/AuthContext'
import { MemberAvatar } from './MemberAvatar'
import { api } from '../lib/axios'
import { Pressable } from '@react-native-material/core'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'

interface CardMemberProps {
  member: UserProps
  fetchUser?: boolean
  endComponent?: ReactElement<any, any>
  bottomComponent?: ReactElement<any, any>
  cardBoxProps?: InterfaceBoxProps
  hideSubtitle?: boolean
  onPress?: () => void
}

interface CardSkeletonProps {
  nameSkeleton?: boolean
}

export function CardMember({
  member,
  fetchUser,
  endComponent,
  bottomComponent,
  cardBoxProps,
  hideSubtitle,
  onPress
}: CardMemberProps) {
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
    <CardBox {...cardBoxProps}>
      <Pressable
        disabled={onPress === undefined}
        onPress={onPress}
        style={{
          padding: 12
        }}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space={3} w="2/3">
            <MemberAvatar member={user} size="sm" />
            <VStack w="full">
              <Text color="white" fontSize="md">
                {user.firstname
                  ? `${user.firstname} ${user.lastname || ''}`
                  : user.email}
              </Text>
              {user.firstname && !hideSubtitle && (
                <Text color="gray.200" fontSize="sm">
                  {user.email}
                </Text>
              )}
              {bottomComponent}
            </VStack>
          </HStack>
          {endComponent}
        </HStack>
      </Pressable>
    </CardBox>
  ) : (
    <></>
  )
}

export function CardSkeleton({ nameSkeleton }: CardSkeletonProps) {
  return (
    <CardBox p={3}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space={3}>
          <Skeleton rounded="full" h={8} w={8} />
          <VStack w="full" space={1}>
            {nameSkeleton && <Skeleton h={4} w={'2/5'} />}
            <Skeleton h={4} w={'3/5'} />
          </VStack>
        </HStack>
      </HStack>
    </CardBox>
  )
}
