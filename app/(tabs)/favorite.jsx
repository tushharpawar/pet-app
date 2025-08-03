import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import Shared from '../shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PetListItem from '../../components/Home/PetListItem'
import { db } from '../../Config/FirebaseConfig'

const Favorite = () => {
  const {user} = useUser()
  const [favIds,setFavIds] = useState([])
  const [favPetList,setFavPetList]=useState([])
  const [loader,setLoader] = useState(false)

  const getFavPetIds=async()=>{
    setLoader(true)
      const result = await Shared.GetFavList(user)     
      setFavIds(result?.favorites)  
      setLoader(false)
      getFavPetList(result?.favorites)

  }

  useEffect(()=>{
    user&&getFavPetIds()
  },[user])

  const getFavPetList = async(favId_) =>{
    setLoader(true)
    setFavPetList([])
    const q = query(collection(db,'Pets'),where('id','in',favId_))
    const querySnapShot = await getDocs(q)

    querySnapShot.forEach((doc)=>{
        setFavPetList(prev=>[...prev,doc.data()])
    })
    setLoader(false)
  }

  return (
    <View
    style={{
      padding:20,
      marginTop:20,
    }}
    >
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Favorites</Text>


      <View 
      style={{
        paddingBottom:70
      }}
      >
      <FlatList
      data={favPetList}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      onRefresh={getFavPetIds}
      refreshing={loader}
      renderItem={({item,index})=>(
        <View style={{
          marginTop:10
        }}>
          <PetListItem pet={item}></PetListItem>
        </View>
      )}
      ></FlatList>
      </View>

    </View>
  )
}

export default Favorite