import { Text, VStack, useTheme } from 'native-base'
import { TextInputProps } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

interface MoneyFieldProps extends TextInputProps {
  error?: string
  hideMessageError?: boolean
  fontSize?: number
}

export default function MoneyField({
  error,
  hideMessageError,
  fontSize,
  ...rest
}: MoneyFieldProps) {
  const { colors } = useTheme()

  return (
    <VStack>
      <TextInputMask
        {...rest}
        style={{
          fontSize: fontSize || 24,
          color: 'white',
          borderBottomWidth: 0.7,
          borderBottomColor: error ? colors.red[500] : colors.gray[400],
          padding: 2
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
      {error && !hideMessageError && <Text color="red.500">{error}</Text>}
    </VStack>
  )
}
