import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Text, ToastAndroid, View } from 'react-native'
import { TextField } from '../../common'
import Button from '../../common/Button'
import styles from './styles'
import { useLoginMutaton } from '../../../mutation/login.mutation'
import { SuccessToast } from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { RootContext } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

type FormType = {
    email: string
    password: string
}

export const LoginFeature = () => {

    const navigation = useNavigation()

    const { setIsLogin }  = useContext(RootContext)

    const { control, handleSubmit } = useForm<FormType>({
        mode: "onChange",
        defaultValues: {
            email: "admin@yopmail.com",
            password: "Test@123"
        }
    })

    const {mutate , isPending } = useLoginMutaton()


    const onSubmit = (formField: FormType) => {
        mutate(formField, {
            onSuccess: async (res) => {
                if (res.data) {
                    await AsyncStorage.setItem('accessToken', res.data.accessToken);
                    setIsLogin(true); 
                }
                SuccessToast({
                    text1: 'Login Successful',
                    text1Props: {
                        style: {
                            color : "red"
                        }
                    }
                });
                
            },
            onError: (err) => {
                console.log(err)
            }
        })
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
                    loading={isPending}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
            
        </KeyboardAvoidingView>
    );
}
