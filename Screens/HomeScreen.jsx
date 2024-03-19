import {  Text,Image,Platform, KeyboardAvoidingView, TouchableOpacity,StyleSheet, TextInput } from 'react-native';
import React  from 'react';
import { useState } from 'react';
import { useFonts,Stick_400Regular } from '@expo-google-fonts/stick';
import { addUserName } from '../reducers/user';
import {useDispatch} from 'react-redux';
export default function HomeScreen({navigation}) {
    const dispatch=useDispatch();
    const [userName,setUserName]=useState('');
    const [error,setError]=useState('');
    let [fontsLoaded]=useFonts({Stick_400Regular,});
    if (!fontsLoaded){
        return null;
    }
    
  
    const handlePress=()=>{
        if (userName===''|| !userName.trim()) {
            setError('Please enter a userName');
            return;
        }
        dispatch(addUserName(userName));
        setError('');
        navigation.navigate('TabNavigator')
    };
  return (
   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  style={styles.container}>
    <Image
        style={styles.image}
        source={require('../assets/Anime.jpg')}
      />
      <Text style={styles.title}>Welcome to AppAnime</Text>
      <TextInput placeholder='userName' style={styles.input} onChangeText={(value)=>setUserName(value)} value={userName}></TextInput>
      {error && <Text>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={()=>handlePress()}><Text style={styles.textButton} >Go to Anime</Text ></TouchableOpacity>
   </KeyboardAvoidingView>
  )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      image: {
        width:"100%",
        height:"70%",
      },
      title: {
        fontFamily: 'Stick_400Regular',
        fontSize: 32,
      },
      input: {
        borderBottomColor: '#B733D0',
        borderBottomWidth: 2,
        width: '80%',
        paddingBottom: 3,
        fontSize: 25,
        marginVertical: 45,
      },
      button: {
        backgroundColor: '#8953c2',
        width: '80%',
        paddingVertical: 15,
        borderRadius: 15,
      },
      textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Stick_400Regular',
      },
})