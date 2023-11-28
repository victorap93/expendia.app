import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '@env'

const api = axios.create({
  baseURL: 'http://192.168.18.56:3000'
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
