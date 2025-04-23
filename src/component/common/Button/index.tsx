import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styles from './styles'

type ButtonProps = TouchableOpacityProps & {
    varient?: "filled" | 'outlined'
    text: string,
    loading? :boolean
}

const Button = ({ varient = "filled", text = "Button", loading, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity {...rest} style={styles[varient]}>
            <Text style={styles[`${varient}Text`]}>{text}</Text>
            {loading && <ActivityIndicator color={"#FFF"} />}
        </TouchableOpacity>
    )
}

export default Button
