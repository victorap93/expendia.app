import { Button, HStack } from 'native-base'
import React from 'react'
import { MemberProps } from './MembersList'

interface SelectAllMembersProps {
  members: MemberProps[]
  selectedMembers: string[]
  setSelectedMembers: (selectedMembers: string[]) => void
}

export const SelectAllMembers: React.FC<SelectAllMembersProps> = ({
  members,
  selectedMembers,
  setSelectedMembers
}) => {
  return members.length > 1 ? (
    <HStack justifyContent="flex-end" width="full">
      <Button
        variant="ghost"
        onPress={() => {
          setSelectedMembers(
            members.length === selectedMembers.length
              ? []
              : members.map(({ email }) => email)
          )
        }}
      >
        {`${
          members.length === selectedMembers.length ? 'DES' : ''
        }SELECIONAR TODOS`}
      </Button>
    </HStack>
  ) : (
    <></>
  )
}
