import React, { ReactElement } from 'react'
import { UserProps } from '../context/AuthContext'
import { VStack } from 'native-base'
import { useAuth } from '../hooks/useAuth'
import CardMember from './CardMember'

interface CardMemberProps extends UserProps {
  endComponent?: ReactElement<any, any>
}

interface MembersListProps {
  members: CardMemberProps[]
  autoInclude?: boolean
  fetchUser?: boolean
}

export default function MembersList({
  members,
  autoInclude,
  fetchUser
}: MembersListProps) {
  const { user } = useAuth()

  return (
    <VStack space={2}>
      {autoInclude && <CardMember key={user.email} member={user} />}
      {members.map(member => (
        <CardMember
          key={member.email}
          member={member}
          fetchUser={fetchUser}
          endComponent={member.endComponent}
        />
      ))}
    </VStack>
  )
}
