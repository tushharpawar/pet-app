import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const UserItem = ({userInfo}) => {
  
  return (
    <Link href={'/chat?id='+userInfo.docId}>
    <View style={{
        marginVertical:8,
      }}>
        <View
    style={{
        marginVertical:7,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
    }}
    >
      <Image source={{uri:userInfo.imgUrl}} 
      style={{
        width:40,
        height:40,
        borderRadius:99
      }}
      ></Image>

      <Text
      style={{
        fontFamily:'outfit-regular',
        fontSize:20
      }}
      >{userInfo.name}</Text>

    </View>
      </View>
    </Link>
  )
}

export default UserItem