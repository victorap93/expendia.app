import { Text, VStack, useTheme } from 'native-base'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'
import { TextInputProps } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

interface MoneyFieldProps extends TextInputProps {
  error?: string
  hideMessageError?: boolean
  fontSize?: number
  slots?: {
    stack?: InterfaceVStackProps
    error?: InterfaceTextProps
  }
}

export default function MoneyField({
  error,
  hideMessageError,
  fontSize,
  slots,
  ...rest
}: MoneyFieldProps) {
  const { colors } = useTheme()

  return (
    <VStack {...slots?.stack}>
      <TextInputMask
        {...rest}
        style={{
          fontSize: fontSize || 24,
          color: 'white',
          borderBottomWidth: 0.7,
          borderBottomColor: error ? colors.red[500] : colors.gray[400],
          padding: 2,
          ...(typeof rest.style === 'object' ? rest.style : {})
        }}
        type="money"
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: ''
        }}
      />
      {error && !hideMessageError && (
        <Text color="red.500" {...slots?.error}>
          {error}
        </Text>
      )}
    </VStack>
  )
}
