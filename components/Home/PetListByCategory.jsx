import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PetListItem from './PetListItem'
import { db } from '../../Config/FirebaseConfig'

const PetListByCategory = () => {

    const [petList,setPetList] = useState([])
    const[loader,setLoader] = useState(false)

    const GetPetList =async (category)=>{
      setLoader(true)
        setPetList([])
        
        const q = query(collection(db,'Pets'),where('category','==',category));

        const snapShot = await getDocs(q);

        snapShot.forEach((doc)=>{
            setPetList(petList => [...petList,doc.data()])
        })
        setLoader(false)
    }

    useEffect(()=>{
      GetPetList('Dog')
    },[])

  return (
    <View>
    <Category category={(value)=>GetPetList(value)}></Category>

    <FlatList
    style={{
      marginTop:10
    }}
    refreshing={loader}
    onRefresh={()=>GetPetList('Dog')}
    horizontal={true}
    data={petList}
    renderItem={({item,index})=>(
      <PetListItem pet={item}></PetListItem>
    )}
    >
    </FlatList>
    </View>
  )
}

export default PetListByCategory

