import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import  Colors  from '../../constants/Colors.ts'
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerInfo = ({pet}) => {
  return (
    <View style={styles.container}>
    <View style={{
      display:'flex',
      flexDirection:'row',
      gap:20
    }}>
      <Image source={{uri:pet.userImg}}
      style={{
        height:50,
        width:50,
        borderRadius:99,
      }}
      ></Image>

    <View>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:17
      }}>{pet.username}</Text>

      <Text
      style={{
        fontFamily:'outfit-regular',
        color:Colors.GRAY
      }}
      >Pet Owner</Text>
    </View>
    </View>
    <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    borderWidth:1,
    borderRadius:15,
    padding:20,
    backgroundColor:Colors.WHITE,
    justifyContent:'space-between',
    borderColor:Colors.PRIMARY
  }
})


export default OwnerInfo