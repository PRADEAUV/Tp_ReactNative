
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/HomeScreen';
import AnimeScreen from './Screens/AnimeScreen';
import FavAnimeScreen from './Screens/FavAnimeScreen';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store=configureStore({
  reducer:{ user },
})
const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();
const TabNavigator=()=>{
  return(
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon:({color,size})=>{
        let iconName='';
        if (route.name==='Anime'){
          iconName='film';
        }else if(route.name==='FavAnime') {
          iconName='heart';
        }
        return<FontAwesomeIcon name={iconName} color={color} size={size}/>;
      },
      tabBarActiveTintColor:'#8953c2',
      tabBarInactiveTintColor:'#504d54',
      headerShown:false,
    })}
    >
      <Tab.Screen name="Anime" component={AnimeScreen}/>
      <Tab.Screen name="FavAnime" component={FavAnimeScreen}/>
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>
     </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
