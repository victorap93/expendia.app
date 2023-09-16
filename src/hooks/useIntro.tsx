import { useContext } from 'react'
import { IntroContext, IntroContextDataProps } from '../context/IntroContext'

export function useIntro(): IntroContextDataProps {
  const context = useContext(IntroContext)

  return context
}
