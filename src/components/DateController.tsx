import React from 'react'
import { IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { HStack, Text } from 'native-base'

export interface MonthlyProps {
  month: number
  year: number
}

export interface DateControllerProps {
  date: MonthlyProps
  onChange: (date: MonthlyProps) => void
}

export const LABEL_MONTHS: string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export default function DateController({
  date,
  onChange
}: DateControllerProps) {
  const handleBack = () => {
    if (date.month > 0) {
      onChange({
        month: date.month - 1,
        year: date.year
      })
    } else {
      onChange({
        month: LABEL_MONTHS.length - 1,
        year: date.year - 1
      })
    }
  }

  const handleNext = () => {
    if (date.month < LABEL_MONTHS.length - 1) {
      onChange({
        month: date.month + 1,
        year: date.year
      })
    } else {
      onChange({
        month: 0,
        year: date.year + 1
      })
    }
  }

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <IconButton
        icon={() => <Icon name="chevron-left" color="white" size={32} />}
        onPress={handleBack}
      />
      <Text color="white" fontSize="md" textTransform="uppercase">
        {LABEL_MONTHS[date.month]} {date.year}
      </Text>
      <IconButton
        icon={() => <Icon name="chevron-right" color="white" size={32} />}
        onPress={handleNext}
      />
    </HStack>
  )
}
