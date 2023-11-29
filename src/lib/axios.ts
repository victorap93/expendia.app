import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '@env'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken')

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export { api }
