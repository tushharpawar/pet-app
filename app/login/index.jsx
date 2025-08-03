import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors.ts'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {

  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myApp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%'
      }}>
      <Image
        source={require('../../assets/images/login.png')}
        style={{
            width:'100%',
            height:500
        }}
      ></Image>
      <View 
      style={{
        padding:20,
        alignItems:'center',
        display:'flex',
      }}
      >
        <Text
        style={{
            fontFamily:'outfit-bold',
            textAlign:'center',
            fontSize:24,
        }}
        >Let's make new friends.</Text>
        <Text
        style={{
          fontFamily:'outfit-regular',
          fontSize:18,
          textAlign:'center',
          color:Colors.GRAY
        }}
        >Let's adopt the pet which you like and make and make their life happy.</Text>

        <Pressable 
        onPress={onPress}
        style={{
          padding:14,
          marginTop:100,
          backgroundColor:Colors.PRIMARY,
          width:'100%',
          borderRadius:14,
        }}>
        <Text
        style={{
          fontFamily:'outfit-medium',
          fontSize:20,
          textAlign:'center'
        }}
        >Get Started</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen