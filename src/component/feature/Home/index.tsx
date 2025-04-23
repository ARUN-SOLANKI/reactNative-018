import React from 'react'
import { Text, View } from 'react-native'
import SearchBar from './Header'
import { useNavigation } from '@react-navigation/native'

export const HomeFeature = () => {

  const navigation = useNavigation()
  return (
      <View>
        <SearchBar />
      <Text onPress={() => {
        navigation.navigate("CreateOffer" as never)
      }}>Home Feature</Text>
    </View>
  )
}