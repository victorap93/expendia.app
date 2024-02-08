import React, { useRef, useState } from 'react'
import { AlertDialog, HStack, Text, VStack } from 'native-base'
import { MemberAvatar } from './MemberAvatar'
import { CaretDown } from 'phosphor-react-native'
import { Pressable } from '@react-native-material/core'
import { MemberProps } from './MembersList'

interface MemberOptionProps {
  member?: MemberProps
  onPress?: () => void
  selector?: boolean
  padding?: number
}

export interface MemberSelectProps {
  memberSelected?: MemberProps
  members: MemberProps[]
  onChange: (member: MemberProps) => void
}
export interface MemberOptionsProps extends MemberSelectProps {
  isOpen?: boolean
  onClose: () => void
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
        {member ? (
          <>
            <MemberAvatar member={member} size="sm" />
            <Text color="white" fontSize="md">
              {member.firstname
                ? `${member.firstname} ${member.lastname || ''}`
                : member.email}
            </Text>
          </>
        ) : (
          <Text color="white" fontSize="md">
            Selecione
          </Text>
        )}
        {selector && <CaretDown color="white" size={24} />}
      </HStack>
    </Pressable>
  )
}

export function MemberSelect(props: MemberSelectProps) {
  const { memberSelected } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <MemberOption
        member={memberSelected}
        onPress={() => setIsOpen(true)}
        selector
      />
      <MemberOptions
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export const MemberOptions: React.FC<MemberOptionsProps> = ({
  members,
  isOpen,
  onClose,
  onChange
}) => {
  const cancelRef = useRef(null)
  return (
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
  )
}
