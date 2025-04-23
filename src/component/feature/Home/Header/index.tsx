import React from 'react'
import { StyleSheet, View } from 'react-native'
import searchIcon from '../../../../assets/images/seachIcon.png'
import { SearchBar } from '../../../common'

const Header = () => {
  return (
      <View>
          <SearchBar placeholder='Search Offers' endEndorment={searchIcon} onChangeText={(e) => {
              console.log(e)
          }} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})