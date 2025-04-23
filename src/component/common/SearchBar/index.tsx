import React, { ReactNode } from 'react'
import { Image, ImageSourcePropType, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import styles from './styles'


type TextInputFieldProps = TextInputProps & {
  label?: string | ReactNode,
  errorMessage?: string,
  endEndorment?: ImageSourcePropType
}

export const SearchBar = ({ label, errorMessage, endEndorment, ...rest }: TextInputFieldProps) => {

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.input}>
        <TextInput
          {...rest}
          style={{
            width: "90%"
          }}
        />
        {endEndorment && <TouchableOpacity>
          <Image source={endEndorment} alt='search-icon' width={20} height={20} style={{
            height: 20,
            width: 20,
          }} />
        </TouchableOpacity>}
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  )
}