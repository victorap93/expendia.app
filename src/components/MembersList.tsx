import React, { ReactElement } from 'react'
import { UserProps } from '../context/AuthContext'
import { VStack } from 'native-base'
import { useAuth } from '../hooks/useAuth'
import { CardMember, CardMemberSlots } from './CardMember'

export interface MemberProps extends UserProps {}
interface CardMemberProps extends MemberProps {
  endComponent?: ReactElement<any, any>
  bottomComponent?: ReactElement<any, any>
  slots?: CardMemberSlots
  hideSubtitle?: boolean
}

interface MembersListProps {
  members: CardMemberProps[]
  autoInclude?: boolean
  fetchUser?: boolean
  onPress?: (member: MemberProps) => void
  renderCard?: (
    member: MemberProps,
    component: React.ReactNode
  ) => React.ReactNode
}

export default function MembersList({
  members,
  autoInclude,
  fetchUser,
  onPress,
  renderCard
}: MembersListProps) {
  const { user } = useAuth()

  return (
    <VStack space={2}>
      {autoInclude && <CardMember key={user.email} member={user} />}
      {members.map(member => {
        let component = (
          <CardMember
            key={member.email}
            member={member}
            fetchUser={fetchUser}
            endComponent={member.endComponent}
            bottomComponent={member.bottomComponent}
            hideSubtitle={member.hideSubtitle}
            slots={member.slots}
            onPress={onPress ? () => onPress(member) : undefined}
          />
        )

        return renderCard ? renderCard(member, component) : component
      })}
    </VStack>
  )
}
