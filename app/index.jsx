import { Pressable, Text, View } from "react-native";
import { Link,Redirect,useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {

  const {user} = useUser();

  const userootNavigationState = useRootNavigationState();

  useEffect(()=>{
checkNavLoaded()
  },[])

  const checkNavLoaded = () =>{
    if(!userootNavigationState)
      return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
    
    {
      user?
      <Redirect href={'/(tabs)/home'}></Redirect>
      :<Redirect href={'/login'}></Redirect>
    }
      
    </View>
  );
}
