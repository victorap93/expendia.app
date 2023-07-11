import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Email from '../screens/Email'
import SignIn from '../screens/SignIn'
import Groups from '../screens/Groups'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import SignUp from '../screens/SignUp'
import Register from '../screens/Register'
import PasswordRecovery from '../screens/PasswordRecovery'
import ValidateCode from '../screens/ValidateCode'
import Password from '../screens/Password'
import Expenses from '../screens/Expenses'
import GroupName from '../screens/GroupName'
import GroupMembers from '../screens/GroupMembers'
import RecentMembers from '../screens/RecentMembers'

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator()
  const { isUserLoading, user } = useAuth()

  return isUserLoading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Navigator
        initialRouteName={user.email ? 'Groups' : 'Home'}
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
        <Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Screen name="ValidateCode" component={ValidateCode} />
        <Screen name="Password" component={Password} />
        <Screen name="Groups" component={Groups} />
        <Screen name="GroupName" component={GroupName} />
        <Screen name="GroupMembers" component={GroupMembers} />
        <Screen name="RecentMembers" component={RecentMembers} />
        <Screen name="Expenses" component={Expenses} />
      </Navigator>
    </NavigationContainer>
  )
}
