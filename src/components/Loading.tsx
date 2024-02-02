import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { THEME } from '../styles/theme'

export default function Loading() {
  const { colors } = THEME
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray[950]
      }}
    >
      <ActivityIndicator color={colors.palette.purple} size="large" />
    </View>
  )
}
