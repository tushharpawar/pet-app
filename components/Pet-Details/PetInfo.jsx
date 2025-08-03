import { View, Text ,Image} from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from '../MarkFav'


const PetInfo = ({pet}) => {
  return (
    <View>
      <Image source={{uri:pet.imgUrl}}
      style={{
        width:'100%',
        height:400,
        objectFit:'cover'
      }}
      ></Image>

      <View
      style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }}
      >
      <View>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:27
        }}>{pet.name}</Text>

        <Text
        style={{
            fontFamily:'outfit-regular',
            fontSize:16,
            color:Colors.GRAY
        }}
        >{pet.address}</Text>
      </View>
        <MarkFav pet={pet}></MarkFav>
      </View>
    </View>
  )
}

export default PetInfo