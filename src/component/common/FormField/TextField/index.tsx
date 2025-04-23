import React, { ReactNode } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import styles from './styles'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

type TextFieldProps<T extends FieldValues> = UseControllerProps<T> & TextInputProps & {
  label?: string | ReactNode,
}

export const TextField = <T extends FieldValues>({ label, name, control, rules, ...rest }: TextFieldProps<T>) => {

  const { field,fieldState } = useController({
    name,
    control,
    rules
  })

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...rest}
        onChangeText={(e) => {
          field.onChange(e)
        }}
        style={styles.input}
      />
      {fieldState.error?.message && <Text style={styles.error}>{fieldState.error?.message}</Text>}
    </View>
  )
}