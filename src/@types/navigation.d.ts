import { FormEmail } from '../screens/Email'
import { ExpenseDetails } from '../screens/Expense'
import { ExpenseForm } from '../screens/ExpenseName'
import { GroupForm } from '../screens/GroupName'
import { GroupProps } from '../screens/Groups'
import { PasswordParams } from '../screens/Password'
import { HandlePayingProps } from '../screens/PayingMembers'
import { HandleMembersProps } from '../screens/RecentMembers'
import { FormSignUp } from '../screens/SignUp'
import { Configurations } from '../screens/Configurations'
import { Logout } from '../screens/Logout'

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
      Expense: ExpenseDetails
      ExpenseName: ExpenseForm
      ExpenseCost: ExpenseForm
      ExpensePayers: ExpenseForm
      PayingMembers: HandlePayingProps
      Configurations: undefined
      Logout: undefined
    }
  }
}
