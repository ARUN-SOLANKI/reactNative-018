import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import { TextField } from '../../common'
import Button from '../../common/Button'
import styles from './styles'

type FormType = {
    email: string
    password: string
}

export const LoginFeature = () => {

    const { control, handleSubmit } = useForm<FormType>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (formField: FormType) => {
    }

    return (
        <KeyboardAvoidingView behavior="padding" >
            <View style={styles.formWrapper}>
                <Text style={styles.header}>Welcome To Barter It</Text>
                <View style={styles.fieldsWrapper}>
                    <TextField
                        control={control}
                        name='email'
                        placeholder="Enter Email Id"
                        label="Email Id"
                        rules={{
                            required : "Required Field"
                        }}
                    />

                    <TextField
                        placeholder="Enter Password"
                        secureTextEntry
                        label="Password"
                        control={control}
                        name='password'
                        rules={{
                            required: "Required Field"
                        }}
                    />
                </View>
                <Button
                    text="Login"
                    loading={isLoading}

                    onPress={handleSubmit(onSubmit)}

                />
            </View>
        </KeyboardAvoidingView>
    );
}
