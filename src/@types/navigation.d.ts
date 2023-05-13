import { FormEmail } from '../screens/Email'

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      Email: undefined
      SignIn: FormEmail
      SignUp: FormEmail
      Group: undefined
    }
  }
}
