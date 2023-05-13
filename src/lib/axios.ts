import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = 'http://192.168.18.56:3333'

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
