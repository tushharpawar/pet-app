import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const Profile = () => {
  const {user} = useUser()
  const router = useRouter()
  const {signOut} = useAuth()

  const onPressMenu=(menu)=>{
    if(menu.path == 'logout'){
      signOut()
      router.push('/login')
      return;
    }
    
    router.push(menu.path)
  }

  const Menu =[
    {
      id:1,
      name:'Add New Pet',
      icon:'add-circle',
      path:'/add-new-pet',
    },
    {
      id:5,
      name:'My Posts',
      icon:'bookmark',
      path:'/user-post',
    },
    {
      id:2,
      name:'Favorites',
      icon:'heart',
      path:'/(tabs)/favorite',
    },
    {
      id:3,
      name:'Inbox',
      icon:'chatbubble',
      path:'/(tabs)/inbox',
    },
    {
      id:4,
      name:'Logout',
      icon:'exit',
      path:'logout',
    },
  ]

  return (
    <View 
    style={{
      padding:20,
      marginTop:20,
    }}
    >
      <Text
      style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}
      >Profile</Text>

      <View 
      style={{
        display:'flex',
        alignItems:'center',
        marginVertical:25
      }}
      >
        <Image source={{uri:user?.imageUrl}}
        style={{
          width:80,
          height:80,
          borderRadius:99,
        }}
        ></Image>

        <Text
        style={{
          fontFamily:'outfit-medium',
        fontSize:18
        }}
        >{user?.fullName}</Text>
        <Text
        style={{
          fontFamily:'outfit-regular',
          color:Colors.GRAY,
          marginTop:6
        }}
        >{user?.primaryEmailAddress?.emailAddress}</Text>
        
      </View>
      <FlatList
      data={Menu}
      key={Menu?.id}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={()=>onPressMenu(item)}
        style={{
          marginVertical:10,
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:10,
          backgroundColor:Colors.WHITE,
          padding:10,
          borderRadius:10
        }}
        >
          <Ionicons name={item?.icon} size={35} color={Colors.PRIMARY}
          style={{
            padding:10,
            backgroundColor:Colors.LIGHT_PRIMARY,
            borderRadius:10
          }}
          ></Ionicons>
          <Text
          style={{
            fontFamily:'outfit-regular',
            fontSize:20
          }}
          >{item?.name}</Text>
        </TouchableOpacity>
      )}
      />
      
    </View>
  )
}

export default Profile