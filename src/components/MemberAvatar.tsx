import React from 'react'
import { Avatar } from 'native-base'
import { UserProps } from '../context/AuthContext'

interface AvatarGroupProps {
  members: UserProps[]
}

export function AvatarGroup({ members = [] }: AvatarGroupProps) {
  return (
    <Avatar.Group
      _avatar={{
        size: 'md'
      }}
      max={3}
    >
      {members.map(member => (
        <Avatar
          key={member.email}
          bg="gray.200"
          source={
            member.avatarUrl
              ? {
                  uri: member.avatarUrl
                }
              : undefined
          }
        >
          {member.firstname
            ? member.firstname.substring(0, 1).toUpperCase() +
              member.lastname!.substring(0, 1).toUpperCase()
            : member.email.substring(0, 2).toUpperCase()}
        </Avatar>
      ))}
    </Avatar.Group>
  )
}
