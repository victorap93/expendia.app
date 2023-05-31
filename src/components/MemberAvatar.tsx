import React from 'react'
import { Avatar, Center } from 'native-base'
import { UserProps } from '../context/AuthContext'

interface AvatarGroupProps {
  members: UserProps[]
}

interface MemberAvatarProps {
  member: UserProps
}

export function MemberAvatar({ member }: MemberAvatarProps) {
  return (
    <Avatar
      bg="gray.200"
      source={{
        uri: member.avatarUrl
      }}
    >
      {member.firstname
        ? member.firstname.substring(0, 1).toUpperCase()
        : member.email.substring(0, 1).toUpperCase()}
    </Avatar>
  )
}

export function AvatarGroup({ members }: AvatarGroupProps) {
  return (
    <Center>
      <Avatar.Group
        _avatar={{
          size: 'md'
        }}
        max={4}
      >
        {members.map(member => (
          <MemberAvatar key={member.email} member={member} />
        ))}
      </Avatar.Group>
    </Center>
  )
}
