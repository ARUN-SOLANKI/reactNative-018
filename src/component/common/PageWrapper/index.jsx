import React, { ReactNode } from 'react'
import { Text, View, ViewProps } from 'react-native'
import { styles } from './styles'

export const PageWrapper = ({ children, title, ...rest }) => {
  return (
      <View style={styles.wrapper} {...rest}>
          {title  && <Text style={styles.title}>{ title }</Text>}
          {children}
    </View>
  )
}
