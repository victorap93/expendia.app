import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Email from '../screens/Email'
import SignIn from '../screens/SignIn'
import Group from '../screens/Group'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import SignUp from '../screens/SignUp'
import Register from '../screens/Register'

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator()
  const { isUserLoading, user } = useAuth()

  return isUserLoading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Navigator
        initialRouteName={user.email ? 'Group' : 'Home'}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'black'
          }
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="Email" component={Email} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Register" component={Register} />
        <Screen name="Group" component={Group} />
      </Navigator>
    </NavigationContainer>
  )
}
