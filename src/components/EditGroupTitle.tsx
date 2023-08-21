import React from 'react'
import { Alert } from 'react-native'
import EditTitle from './EditTitle'
import { GroupProps } from '../screens/Groups'
import { api } from '../lib/axios'

interface Props {
  group: GroupProps
  setGroup: (group: GroupProps) => void
  onClose: () => void
}

export default function EditGroupTitle({ group, setGroup, onClose }: Props) {
  async function changeTitle(title: string) {
    try {
      const response = await api.patch(`/groups/${group.id}`, { title })
      if (response.data.status) {
        setGroup({
          ...group,
          title
        })
      } else {
        Alert.alert('Ops!', 'Não foi possível alterar o título do grupo.')
      }
    } catch (error) {
      Alert.alert('Ops!', 'Não foi possível alterar o título do grupo.')
      console.error(error)
    } finally {
      onClose()
    }
  }

  return (
    <EditTitle
      defaultValue={group.title}
      onClose={onClose}
      onSave={changeTitle}
    />
  )
}
