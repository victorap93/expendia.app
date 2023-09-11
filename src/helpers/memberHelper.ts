import { API_URL } from '@env'

export const getAvatarUrl = (uri: string) => {
  const date = new Date()
  return API_URL + uri + '?' + date.getTime()
}
