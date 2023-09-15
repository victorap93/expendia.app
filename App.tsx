import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'
import Loading from './src/components/Loading'
import Routes from './src/routes'
import { AuthContextProvider } from './src/context/AuthContext'
import { IntroContextProvider } from './src/context/IntroContext'

export default function App() {
  const [fonstLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return !fonstLoaded ? (
    <Loading />
  ) : (
    <NativeBaseProvider theme={THEME}>
      <IntroContextProvider>
        <AuthContextProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </AuthContextProvider>
      </IntroContextProvider>
    </NativeBaseProvider>
  )
}
