import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

const AboutPet = ({pet}) => {
    const [readmore,setReadmore] = useState(true)
  return (
    <View 
    style={{
        padding:20
    }}
    >
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
      }}>About {pet.name}</Text>
    <Text
    numberOfLines={readmore ? 3 : 20}
    style={{
        fontFamily:'outfit-regular',
        fontSize:14,
    }}>
        {pet.about} 
    </Text>
    {
        readmore && 
        <Pressable onPress={()=>setReadmore(false)}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:14,
            color:Colors.SECONDARY
        }}>Read More</Text>
        </Pressable>
    }
    </View>
  )
}

export default AboutPet