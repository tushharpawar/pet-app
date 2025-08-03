import { View, Text, Image,FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const Slider = () => {
    const [sliderList,setSliderList] = useState([])

    const GetSlider = async()=>{
        setSliderList([])
        const snapShot = await getDocs(collection(db,'Sliders'))
        snapShot.forEach((doc)=>{
            setSliderList(sliderList=>[...sliderList,doc.data()])
        })
    }

    useEffect(()=>{
        GetSlider()
    },[])

  return (
    <View style={{
        marginTop:15
    }}>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={sliderList}
      renderItem={({item,index})=>(
        <View>
            <Image source={{uri:item?.imgUrl}}
            style={styles.sliderImage}
            />
        </View>
      )}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  sliderImage:{
    width:Dimensions.get('screen').width*0.9,
    height:170,
    borderRadius:15,
    marginRight:15
  }
})


export default Slider