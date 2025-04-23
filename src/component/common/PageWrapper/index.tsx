import React, { ReactNode } from 'react'
import { Text, View, ViewProps } from 'react-native'
import { styles } from './styles'

type PageWrapperProps = ViewProps & {
    children: ReactNode,
  title?: ReactNode | string,
}

export const PageWrapper = ({ children, title, ...rest }: PageWrapperProps) => {
  return (
      <View style={styles.wrapper} {...rest}>
          {title  && <Text style={styles.title}>{ title }</Text>}
          {children}
    </View>
  )
}
