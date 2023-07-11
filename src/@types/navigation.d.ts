import { FormEmail } from '../screens/Email'
import { GroupForm } from '../screens/GroupName'
import { GroupProps } from '../screens/Groups'
import { PasswordParams } from '../screens/Password'
import { HandleMembersProps } from '../screens/RecentMembers'
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
      Groups: undefined
      GroupName: undefined
      GroupMembers: GroupForm
      RecentMembers: HandleMembersProps
      Expenses: GroupProps
      ExpenseName: undefined
    }
  }
}
