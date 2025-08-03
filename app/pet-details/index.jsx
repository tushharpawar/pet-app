import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/Pet-Details/PetInfo'
import PetSubInfo from '../../components/Pet-Details/PetSubInfo'
import AboutPet from '../../components/Pet-Details/AboutPet'
import OwnerInfo from '../../components/Pet-Details/OwnerInfo'
import Colors from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'

const PetDetails = () => {
    const pet = useLocalSearchParams()
    const nevigation = useNavigation()
    const {user} = useUser()
    const router = useRouter()

    useEffect(()=>{
        nevigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    // used to initiate chat between 2 users

    const InitiateChat =async () =>{
      const docId1 = user.primaryEmailAddress.emailAddress + '_' + pet.email;
      const docId2 = pet.email+'_'+user.primaryEmailAddress.emailAddress;

      const q = query(collection(db,'Chat'),where('id','in',[docId1,docId2]));
      const querySnapshot = await getDocs(q) 

      querySnapshot.forEach(doc => {
          router.push({
            pathname:'/chat',
            params:{id:doc.id}
          })
      });

      if(querySnapshot.docs.length == 0){
        await setDoc(doc(db,'Chat',docId1),{
          id:docId1,
          users:[
            {
              email:user.primaryEmailAddress.emailAddress,
              imgUrl:user.imageUrl,
              name:user.fullName
            },
            {
              email:pet.email,
              imgUrl:pet.userImg,
              name:pet.username
            }
          ],
          userIds:[user.primaryEmailAddress.emailAddress,pet.email]
        })

        router.push({
          pathname:'/chat',
          params:{id:docId1}
        })
      } 
    }

  return (
    <View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <PetInfo pet={pet}></PetInfo>
        <PetSubInfo pet={pet}></PetSubInfo>
        <AboutPet pet={pet}></AboutPet>
        <OwnerInfo pet={pet}></OwnerInfo>
        <View style={{height:70}}>

        </View>      
        </ScrollView>

        <View style={styles.bottonConntainer}>
        <TouchableOpacity style={styles.adoptBtn}
        onPress={InitiateChat}
        >
           <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            fontSize:20
           }}>Adopt me</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  adoptBtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY
  },
  bottonConntainer:{
    position:'absolute',
    width:'100%',
    bottom:0
  }
})


export default PetDetails