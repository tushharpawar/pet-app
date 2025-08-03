import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import PetListItem from '../../components/Home/PetListItem'
import Colors from '../../constants/Colors'


const UserPost = () => {

    const navigation = useNavigation()
    const {user} = useUser()
    const[userPostList,setUserPostList] = useState([])
    const[loader,setLoader]=useState(false)

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'User Post',
        })

        user&&GetUserPost()
    },[user])


    const GetUserPost =async() =>{
        setLoader(true)
        setUserPostList([])
        const q = query(collection(db,'Pets'),where('email','==',user.primaryEmailAddress.emailAddress))
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            setUserPostList(prev => [...prev,doc.data()])
        })
        setLoader(false)
    }

    const OnDeletePost = (docId) =>{
        Alert.alert('Do you want to delete?','Are you sure?',[
            {
            text:'Cancel',
            onPress:()=>console.log('Cancel clicked'),
            style:'cancel'
        },
        {
            text:'Delete',
            onPress:()=>DeletePost(docId),
        },
    ])
    }

    const DeletePost = async(docId) =>{
        await deleteDoc(doc(db,'Pets',docId))
        GetUserPost()
    }
  return (
    <View 
    style={{
        padding:20,
        marginTop:20
    }}
    >
      <Text
      style={{
        fontFamily:'outfit-regular',
        fontSize:30
      }}
      >User Post</Text>

      <FlatList
      data={userPostList}
      refreshing={loader}
      onRefresh={GetUserPost}
      numColumns={2}
      renderItem={({item,index})=>(
        <View>

       <PetListItem
        pet={item}
        key={index}
        ></PetListItem>

        <Pressable
        onPress={()=>OnDeletePost(item.id)}
        style={styles.deleteBtnStyle}>

            <Text
            style={{
                fontFamily:'outfit-regular',
                textAlign:'center'
            }}
            >Delete</Text>
        </Pressable>
        </View>
      )}
      ></FlatList>

      {userPostList.length == 0 && <Text>You don't have any post.</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  deleteBtnStyle:{
    backgroundColor:Colors.LIGHT_PRIMARY,
    padding:5,
    borderRadius:7,
    marginTop:5,
    marginRight:10
  }
})


export default UserPost