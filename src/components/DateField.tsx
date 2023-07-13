import React, { useEffect, useState } from 'react'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { View } from 'native-base'
import TextField, { TextFieldProps } from './TextField'
import dayjs from 'dayjs'
import { TouchableOpacity } from 'react-native'

export interface DateFieldProps extends TextFieldProps {}

export default function DateField({ ...rest }: DateFieldProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    const date = dayjs(selectedDate || new Date()).format('YYYY-MM-DD')
    if (rest.onChangeText) rest.onChangeText(date.toString())
  }

  useEffect(() => {
    setShowDatePicker(false)
  }, [rest.value])

  return (
    <View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextField
          {...rest}
          value={dayjs(rest.value).format('DD/MM/YYYY')}
          isReadOnly
          onChangeText={undefined}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={rest.value ? new Date(rest.value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          themeVariant="dark"
        />
      )}
    </View>
  )
}
