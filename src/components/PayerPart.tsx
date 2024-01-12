import React from 'react'
import { HStack, Input, Text, useTheme } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import MoneyField from '../components/MoneyField'
import {
  convertFloatToMoney,
  convertMoneyToFloat
} from '../helpers/expenseHelper'

export interface PayerPartFormProps {
  cost: string
  percentage: string
}

export interface PayerPartProps {
  payerPart: number
  total: number
  getPayerPart: (payerPart: number) => void
}

export default function PayerPart({
  payerPart,
  total,
  getPayerPart
}: PayerPartProps) {
  const getPercentage = (value: number) => (value / total) * 100

  const getValue = (percentage: string) => {
    const percent = parseFloat(percentage)
    const value = (percent / 100) * total
    return convertFloatToMoney(value)
  }

  const submit = (values: PayerPartFormProps) =>
    getPayerPart(convertMoneyToFloat(values.cost))

  return (
    <Formik
      initialValues={
        {
          cost: payerPart ? convertFloatToMoney(payerPart) : '0,00',
          percentage: getPercentage(payerPart).toFixed(2).toString()
        } as PayerPartFormProps
      }
      onSubmit={submit}
      enableReinitialize
    >
      {({ setFieldValue, handleSubmit, values }) => (
        <HStack mt={1} space={2} alignItems="flex-end">
          <MoneyField
            fontSize={16}
            onChangeText={value => {
              setFieldValue('cost', value)
              setFieldValue(
                'percentage',
                getPercentage(convertMoneyToFloat(value)).toFixed(2).toString()
              )
            }}
            value={values.cost}
            onEndEditing={() => handleSubmit()}
            onBlur={() => handleSubmit()}
            style={{
              width: '100%'
            }}
            slots={{
              stack: {
                width: '45%'
              }
            }}
          />
          <Text color="white" width="5%" fontSize="md">
            =
          </Text>
          <HStack width="30%" alignItems="center">
            <Input
              color="white"
              size="md"
              width="5/6"
              borderWidth={0}
              fontSize={16}
              borderBottomWidth={0.7}
              borderBottomColor="gray.400"
              borderRadius={0}
              value={values.percentage}
              onChangeText={value => {
                setFieldValue('percentage', value)
                setFieldValue('cost', getValue(value))
              }}
              keyboardType="numeric"
              p={0}
              px={1}
              onEndEditing={() => handleSubmit()}
              onBlur={() => handleSubmit()}
            />
            <Text
              color="white"
              width="1/6"
              fontSize="md"
              mt={1}
              borderBottomWidth={0.7}
              borderBottomColor="gray.400"
            >
              %
            </Text>
          </HStack>
        </HStack>
      )}
    </Formik>
  )
}
