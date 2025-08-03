import { View, Text, FlatList } from 'react-native'
import { query,collection, where, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'

const Inbox = () => {

  const [userList,setUserList] = useState([])
  const [loader,setLoader] = useState(false)
  const {user} = useUser()

  // get user list depends on current user

  const GetUserList = async() =>{
    setLoader(true)
    setUserList([])
    const q = query(collection(db,'Chat'),where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc=>{
      setUserList(prevList=>[...prevList,doc.data()])
    })

    setLoader(false)
  }

  useEffect(()=>{
    user&&GetUserList()
  },[user])


  // filter the list of other user in one state

  const MapOtherUser = () =>{
    const list =[]

    userList.forEach((record)=>{

      const otherUser = record.users?.filter(user1 => user1.email !== user?.primaryEmailAddress?.emailAddress)
      
      const result ={
        docId:record.id,
        ...otherUser[0]
      }

      
      list.push(result)
      
    })

    return list;
  }

  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text 
      style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}
      >Inbox</Text>

      <FlatList
      data={MapOtherUser()}
      style={{
        marginTop:20,
      }}
      refreshing={loader}
      onRefresh={GetUserList}
      renderItem={({item,index})=>
        <UserItem userInfo={item} key={index}></UserItem>
      }
      >
      </FlatList>

      {userList.length == 0 && <Text>Start chatting with your friends!</Text>}
    </View>
  )
}

export default Inbox