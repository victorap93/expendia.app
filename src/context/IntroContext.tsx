import { createContext, ReactNode, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IntroContextDataProps {
  introduced?: boolean
  setIntroduced: (initialState: boolean | (() => boolean)) => void
}

interface IntroProviderProps {
  children: ReactNode
}

export const IntroContext = createContext({} as IntroContextDataProps)

export function IntroContextProvider({ children }: IntroProviderProps) {
  const [introduced, setIntroduced] = useState<boolean>()

  async function getIntroduced() {
    try {
      const introducedStorage = await AsyncStorage.getItem('introduced')
      setIntroduced(introducedStorage === '1')
    } catch (error) {
      console.error(error)
    }
  }

  async function storeIntroduced() {
    try {
      await AsyncStorage.setItem('introduced', introduced ? '1' : '0')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (introduced !== undefined) storeIntroduced()
  }, [introduced])

  useEffect(() => {
    getIntroduced()
  }, [])

  return (
    <IntroContext.Provider
      value={{
        introduced,
        setIntroduced
      }}
    >
      {children}
    </IntroContext.Provider>
  )
}
