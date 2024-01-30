import React, { useRef, useState } from 'react'
import { AlertDialog, HStack, Text, VStack } from 'native-base'
import { MemberAvatar } from './MemberAvatar'
import { CaretDown } from 'phosphor-react-native'
import { Pressable } from '@react-native-material/core'
import { MemberProps } from './MembersList'

interface MemberOptionProps {
  member: MemberProps
  onPress?: () => void
  selector?: boolean
  padding?: number
}

interface MemberSelectProps {
  memberSelected: MemberProps
  members: MemberProps[]
  onChange: (member: MemberProps) => void
}

export function MemberOption({
  member,
  onPress,
  selector,
  padding
}: MemberOptionProps) {
  return (
    <Pressable
      style={{
        padding: padding || 4,
        width: '100%'
      }}
      onPress={onPress}
    >
      <HStack alignItems="center" space={2} w="full">
        <MemberAvatar member={member} size="sm" />
        <Text color="white" fontSize="md">
          {member.firstname
            ? `${member.firstname} ${member.lastname || ''}`
            : member.email}
        </Text>
        {selector && <CaretDown color="white" size={24} />}
      </HStack>
    </Pressable>
  )
}

export function MemberSelect({
  memberSelected,
  members,
  onChange
}: MemberSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

  return (
    <>
      <MemberOption
        member={memberSelected}
        onPress={() => setIsOpen(true)}
        selector
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick
      >
        <AlertDialog.Content bgColor="gray.900">
          <VStack>
            {members.map(member => (
              <MemberOption
                key={member.email}
                padding={12}
                member={member}
                onPress={() => {
                  onChange(member)
                  onClose()
                }}
              />
            ))}
          </VStack>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  )
}
