import React, { ReactElement, useEffect, useState } from 'react'
import CardBox from './CardBox'
import { HStack, Skeleton, Text, VStack } from 'native-base'
import { MemberAvatar } from './MemberAvatar'
import { api } from '../lib/axios'
import { Pressable, PressableProps } from '@react-native-material/core'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import { InterfaceHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { MemberProps } from './MembersList'

export type CardMemberSlots = {
  cardBox?: InterfaceBoxProps
  pressable?: PressableProps
  boxContent?: InterfaceHStackProps
  initialContent?: InterfaceHStackProps
  content?: InterfaceVStackProps
}
interface CardMemberProps {
  member: MemberProps
  fetchUser?: boolean
  endComponent?: ReactElement<any, any>
  bottomComponent?: ReactElement<any, any>
  slots?: CardMemberSlots
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
  slots,
  hideSubtitle,
  onPress
}: CardMemberProps) {
  const [user, setUser] = useState<MemberProps | undefined>()
  const [fetched, setFetched] = useState(false)

  async function getUser() {
    try {
      const response = await api.get(`/user/${member.email}`)
      if (response.status !== 404) setUser(response.data.user || member)
    } catch (error) {
      console.error(error)
    } finally {
      setFetched(true)
    }
  }

  useEffect(() => {
    setUser({ ...member })
    if (fetchUser && !fetched) getUser()
  }, [])

  return user ? (
    <CardBox {...slots?.cardBox}>
      <Pressable
        disabled={onPress === undefined}
        onPress={onPress}
        style={{ padding: 16 }}
        {...slots?.pressable}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          {...slots?.boxContent}
        >
          <HStack alignItems="center" space={4} {...slots?.initialContent}>
            <MemberAvatar member={user} size="sm" />
            <VStack w="full" {...slots?.content}>
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
            {endComponent}
          </HStack>
        </HStack>
      </Pressable>
    </CardBox>
  ) : (
    <></>
  )
}

export function CardSkeleton({ nameSkeleton }: CardSkeletonProps) {
  return (
    <CardBox>
      <Pressable style={{ padding: 16 }} disabled>
        <HStack>
          <HStack alignItems="center" space={4}>
            <Skeleton
              rounded="full"
              size={8}
              startColor="#fff"
              endColor="#999"
              opacity={0.4}
              my={1}
            />
            <VStack w="full" space={1}>
              {nameSkeleton && (
                <Skeleton
                  rounded="md"
                  h={4}
                  w={'2/5'}
                  startColor="#fff"
                  endColor="#999"
                  opacity={0.4}
                />
              )}
              <Skeleton
                rounded="md"
                h={4}
                w={'3/5'}
                startColor="#fff"
                endColor="#999"
                opacity={0.4}
              />
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </CardBox>
  )
}
