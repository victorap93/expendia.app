import { useEffect } from 'react'
import TextField, { TextFieldProps } from './TextField'

export interface CodeField extends TextFieldProps {
  onSubmit: () => void
}

export const CodeField: React.FC<CodeField> = ({ onSubmit, ...rest }) => {
  useEffect(() => {
    if (rest.value && rest.value.length >= 5) onSubmit()
  }, [rest.value])

  return (
    <TextField
      {...rest}
      placeholder="Digite o código..."
      keyboardType="numeric"
      onEndEditing={() => onSubmit()}
    />
  )
}
