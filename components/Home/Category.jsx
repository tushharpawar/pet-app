import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import { useEffect } from 'react'
import Colors from '../../constants/Colors.ts'

const Category = ({category}) => {

    const [categoryList,setCategoryList] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('Dog')

    const GetCateGories = async () =>{
        setCategoryList([])
        const snapShot = await getDocs(collection(db,'Category'))
        snapShot.forEach((doc)=>{
            setCategoryList(categoryList => [...categoryList,doc.data()])
        })
    }

    useEffect(()=>{
        GetCateGories()
    },[])
  return (
    <View style={{
        marginTop:20
    }}>
      <Text 
      style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}
      >Category</Text>

      <FlatList
      numColumns={4}
      data={categoryList}
      renderItem={({item,index})=>(
        <View style={{flex:1}}>
            <TouchableOpacity
            onPress={()=>{
                setSelectedCategory(item.name);
                category(item.name)
            }} 
            style={[styles.container,
            selectedCategory == item.name && styles.selectedCategoryContainer
            ]}
            >
                <Image 
                source={{uri:item.imgUrl}}
                style={{
                    width:40,
                    height:40
                }}
                >
                </Image>
            </TouchableOpacity>

            <Text
            style={{
                textAlign:'center',
                fontFamily:'outfit-regular'
            }}
            >{item.name}</Text>
        </View>
      )}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.LIGHT_PRIMARY,
    padding:15,
    alignItems:'center',
    borderWidth:1,
    borderRadius:15,
    borderColor:Colors.PRIMARY,
    margin:5
  },
  selectedCategoryContainer:{
    backgroundColor:Colors.SECONDARY,
    borderColor:Colors.SECONDARY
  }
  }
)


export default Category