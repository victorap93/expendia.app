import React, { ReactElement } from 'react'
import { UserProps } from '../context/AuthContext'
import { VStack } from 'native-base'
import { useAuth } from '../hooks/useAuth'
import { CardMember } from './CardMember'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'

interface CardMemberProps extends UserProps {
  endComponent?: ReactElement<any, any>
  bottomComponent?: ReactElement<any, any>
  cardBoxProps?: InterfaceBoxProps
  hideSubtitle?: boolean
}

interface MembersListProps {
  members: CardMemberProps[]
  autoInclude?: boolean
  fetchUser?: boolean
  onPress?: (member: UserProps) => void
  renderCard?: (
    member: UserProps,
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
            cardBoxProps={member.cardBoxProps}
            onPress={onPress ? () => onPress(member) : undefined}
          />
        )

        return renderCard ? renderCard(member, component) : component
      })}
    </VStack>
  )
}
