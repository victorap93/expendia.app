import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '@env'

export const publicApi = axios.create({
  baseURL: API_URL
})

export async function api() {
  const accessToken = await AsyncStorage.getItem('accessToken')

  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
