import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './bottomTabNavigator';
import { Login } from '../screen';

const Stack = createNativeStackNavigator();

const Router = ({ isLogin }) => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                // initialRouteName={isLogin ? "Home" : "Login"}
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!isLogin ? 
                <Stack.Screen name="Login" component={Login} />
                    :
                <Stack.Screen name="Home" component={BottomTabs} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
