import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans'
import { THEME } from './src/styles/theme'
import Loading from './src/components/Loading'
import Routes from './src/routes'
import { AuthContextProvider } from './src/context/AuthContext'
import { IntroContextProvider } from './src/context/IntroContext'

export default function App() {
  const [fonstLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold
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
