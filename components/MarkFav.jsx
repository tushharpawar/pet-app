import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../app/shared/Shared";
import { useUser } from "@clerk/clerk-expo";

const MarkFav = ({pet,color='black'}) => {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  const getFav = async () => {
    const result = await Shared.GetFavList(user);
    
    setFavList(result.favorites ? result.favorites : []);
  };

  useEffect(() => {
    user && getFav();
  }, [user]);

  const AddToFav = async() =>{
        const favResult = favList;
        favResult.push(pet.id)
        await Shared.UpdateFav(user,favResult)
        getFav()
  }

  const RemoveFromFav = async() =>{
    const favResult = favList.filter(item => item != pet.id)
    await Shared.UpdateFav(user,favResult)
    getFav()
  }
  return (
    <View>
      {favList.includes(pet.id) ? 
        <Pressable onPress={()=>RemoveFromFav()}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
       : 
        <Pressable onPress={()=>AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      }
    </View>
  );
};

export default MarkFav;
