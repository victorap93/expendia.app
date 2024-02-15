import React, { ReactNode } from 'react'
import { Avatar, IAvatarProps } from 'native-base'
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types'
import { getAvatarUrl } from '../helpers/memberHelper'
import { IAvatarBadgeProps } from 'native-base/lib/typescript/components/composites/Avatar'
import { IAvatarGroupProps } from 'native-base/lib/typescript/components/composites/Avatar/types'
import { MemberProps } from './MembersList'

interface AvatarGroupProps extends IAvatarGroupProps {
  members: MemberProps[]
  size?: ThemeComponentSizeType<'Avatar'>
}

interface MemberAvatarProps extends IAvatarProps {
  member: MemberProps
  noGetAvatarUrl?: boolean
  badge?: ReactNode
  badgeProps?: IAvatarBadgeProps
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
            member.avatarUri
              ? {
                  uri: getAvatarUrl(member.avatarUri)
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

export function MemberAvatar({
  member,
  noGetAvatarUrl,
  badge,
  badgeProps,
  ...rest
}: MemberAvatarProps) {
  return (
    <Avatar
      {...rest}
      key={member.email}
      bg="gray.200"
      source={
        member.avatarUri
          ? {
              uri: noGetAvatarUrl
                ? member.avatarUri
                : getAvatarUrl(member.avatarUri)
            }
          : undefined
      }
    >
      {member.firstname
        ? member.firstname.substring(0, 1).toUpperCase() +
          member.lastname!.substring(0, 1).toUpperCase()
        : member.email?.substring(0, 2).toUpperCase()}
      {badge && <Avatar.Badge {...badgeProps}>{badge}</Avatar.Badge>}
    </Avatar>
  )
}
