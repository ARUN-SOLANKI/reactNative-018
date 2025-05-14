import React, { createContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient()

export const RootContext = createContext()

const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem('accessToken');
      if (value) {
        setIsLogin(true);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootContext.Provider value={{ isLogin, setLoading, loading, setIsLogin }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="light-content"
          translucent={false}
        />
        <SafeAreaView style={styles.container}>
          {loading ? <View><Text>Loading..</Text></View>
            : <Router
              isLogin={isLogin}

            />}
          <Toast />
          </SafeAreaView>
        </RootContext.Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarFakeBg: {
    height: StatusBar.currentHeight,
    backgroundColor: 'blue',
  },
});