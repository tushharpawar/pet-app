import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../Config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

const AddNewPet = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(
    {
        category:'Dog',
        sex:'Male',
      }
  );
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader,setLoader] = useState(false);
  const {user} = useUser()
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });

    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapShot = await getDocs(collection(db, "Category"));
    snapShot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    });
  };

  // use to pick image from gallery

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData( prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  //Upload image on firebase

  const UploadImage =async () =>{
    setLoader(true);
    const response =await fetch(image)
    const blobImage = await response.blob();
    
    const storageRef = ref(storage,'PetApp'+Date.now()+'.jpg');

    uploadBytes(storageRef,blobImage).then((snapShot)=>{
        console.log('File uploaded');
    }).then(resp=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
            console.log(downloadUrl);
            SaveFormData(downloadUrl)
        })
    })
  }


  const onSubmit = () => {
    if(Object.keys(formData).length != 8){
        ToastAndroid.show('Enter all fields',ToastAndroid.SHORT)
        return
    }

    UploadImage()
  };

  const SaveFormData = async(imgUrl) =>{
        const docId = Date.now().toString();
        await setDoc(doc(db,'Pets',docId),{
            ...formData,
            imgUrl:imgUrl,
            username:user.fullName,
            email:user.primaryEmailAddress.emailAddress,
            userImg:user.imageUrl,
            id:docId
        })
        setLoader(false);
        router.replace('/(tabs)/home');
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Add New Pet for Adoption
      </Text>

      <Pressable onPress={imagePicker}>
      {
        !image ? <Image
        source={require("../../assets/images/bone.png")}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      ></Image>:
      <Image source={{uri:image}}
      style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      ></Image>
      }
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          placeholder="Enter Pet Name"
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          placeholder="Enter Breed"
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          placeholder="Enter Age"
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex *</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          placeholder="Enter Weight in Kg"
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          placeholder="Enter Address"
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About Pet *</Text>
        <TextInput
          placeholder="Describe about Your Pet"
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          onChangeText={(value) => handleInputChange("about", value)}
        ></TextInput>
      </View>

      <TouchableOpacity 
      disabled={loader}
      onPress={onSubmit} style={styles.button}>
        {
            loader?<ActivityIndicator size={'large'}></ActivityIndicator>:
            <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit-medium",
            textAlign: "center",
          }}
        >
          Submit
        </Text>
        }
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontSize: 14,
    fontFamily: "outfit-regular",
  },
  label: {
    fontSize: 14,
    fontFamily: "outfit-regular",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
});

export default AddNewPet;
