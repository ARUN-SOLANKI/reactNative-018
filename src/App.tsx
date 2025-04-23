import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateOffer, Home, Login } from './screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown:false
          }} >
           
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateOffer" component={CreateOffer} />
          </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  }
})
