import React from 'react'
import { Avatar, IAvatarProps } from 'native-base'
import { UserProps } from '../context/AuthContext'
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types'

interface AvatarGroupProps {
  members: UserProps[]
  size?: ThemeComponentSizeType<'Avatar'>
}

interface MemberAvatarProps extends IAvatarProps {
  member: UserProps
}

export function AvatarGroup({ members = [], size }: AvatarGroupProps) {
  return (
    <Avatar.Group
      _avatar={{
        size: size || 'md'
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

export function MemberAvatar({ member, ...rest }: MemberAvatarProps) {
  return (
    <Avatar
      {...rest}
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
        : member.email?.substring(0, 2).toUpperCase()}
    </Avatar>
  )
}
