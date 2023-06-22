import React from 'react'
import { MemberAvatar } from './MemberAvatar'
import { useAuth } from '../hooks/useAuth'

type Props = {}

export default function MenuButton({}: Props) {
  const { user } = useAuth()

  return <MemberAvatar member={user} size="sm" />
}
