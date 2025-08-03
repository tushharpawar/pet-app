import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'
import { Link } from 'expo-router'

const home = () => {
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      {/* home header */}
      <Header></Header>

      {/* home slider */}
      <Slider></Slider>

      {/* pet category */}
      <PetListByCategory></PetListByCategory>

      {/* add pet component */}
      <Link
      href={'/add-new-pet '}
      style={styles.addNewPetComtainer}
      >
      <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
        style={{
          fontFamily:'outfit-medium',
          color:Colors.PRIMARY,
          fontSize:18,
        }}
        >Add New Pet</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetComtainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20,
    margin:20,
    backgroundColor:Colors.LIGHT_PRIMARY,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:15,
    borderStyle:'dashed',
    justifyContent:'center',
    textAlign:'center'
  }
})


export default home