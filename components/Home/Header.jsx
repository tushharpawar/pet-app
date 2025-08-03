import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';

const Header = () => {

    const {user} = useUser();
    const router = useRouter()

    const onPress=()=>{
      router.push('/(tabs)/profile')
    }

  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
      <View>
        <Text style={{
            fontFamily:'outfit-regular',
            fontSize:18,
        }}>Welcome,</Text>

        <Text
        style={{
            fontFamily:'outfit-medium',
            fontSize:25,
        }}
        >{user?.fullName}</Text>
      </View>

      <Pressable onPress={onPress}>
      <Image source={{uri:user?.imageUrl}} 
      style={{
        width:40,
        height:40, 
        borderRadius:99
      }}/>
      </Pressable>
    </View>
  )
}

export default Header