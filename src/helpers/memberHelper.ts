import { API_URL } from '@env'

export const getAvatarUrl = (uri: string) => {
  return API_URL + uri
}
