import { FormEmail } from '../screens/Email'
import { PasswordParams } from '../screens/Password'
import { FormSignUp } from '../screens/SignUp'

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      Email: undefined
      SignIn: FormEmail
      SignUp: FormEmail
      Register: FormSignUp
      PasswordRecovery: FormEmail
      ValidateCode: FormEmail
      Password: PasswordParams
      Group: undefined
    }
  }
}
