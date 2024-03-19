import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image,Platform,ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addAnime,RemoveAnime } from '../reducers/user';
export default function FavAnimeScreen() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    
    
    
    const toggleFav = (anime) => {
        if (user.animes.some((favAnime) => favAnime.title === anime.title)) {
            dispatch(RemoveAnime(anime));
        } else {
            dispatch(addAnime(anime));
        }
    };
    let List=()=>{
        if(user.animes.length==0){
            return(<Text style={styles.text} >No fav anime saved </Text>)
        }else
        {

        

        return(
            <ScrollView contentContainerStyle={styles.scrollView}>
        {user.animes.map((anime, index) => (
            <View key={index} style={styles.animeCard}>
                <Text style={styles.titleCard}>{anime.title}</Text>
                <TouchableOpacity
                            style={styles.buttonCard}
                            onPress={() => toggleFav(anime)}
                        >
                            <FontAwesomeIcon
                                style={styles.heartO}
                                name={user.animes.some((favAnime) => favAnime.title === anime.title)? 'heart': 'heart-o'} />
                        </TouchableOpacity>
            <View style={styles.cardContent}>
                <Image style={styles.image} source={{ uri: anime.images.jpg.large_image_url }} />
                <View style={styles.cardRight}>
                    <Text style={styles.textCard}> Année : {anime.year}</Text>
                    <Text style={styles.textCard}> Genre: {anime.genres[0].name}</Text>
                    <Text style={styles.textCard}> Score: {anime.score}</Text>
                </View>
            </View>
            <View style={styles.see}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>See more</Text>
                </TouchableOpacity>
                </View>
            </View>
            ))}
        </ScrollView>
        )
    }
    }

    return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.title}>Favorite Anime</Text>
            <Text style={styles.text}>You're logged as {user.userName}</Text>
        </View>

        <List />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animeCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 5,
        margin: 5,
        backgroundColor: 'white', 
        // pour avoir une ombre sur les cards selon la plateform
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
        },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleCard: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Stick_400Regular',
        textAlign: 'center',
    },
    textCard: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Stick_400Regular',
        textAlign: 'right',
    },
    cardRight: {
        marginRight:20,
        flex: 1,
        alignItems: 'flex-end',
        
    },
    buttonCard: {
        flex: 1,
        alignItems: 'flex-end',
    },
    heartO: {
        marginBottom:20,
        fontSize: 30,
        paddingBottom: 8,
        color:'#8953c2',
    },
   
    image: {
        width: 100,
        height: 150,
        marginLeft:15,
    },
    button: {
        backgroundColor: '#8953c2',
        width: '30%',
        paddingVertical: 5,
        borderRadius: 15,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Stick_400Regular',
        },
    see: {
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Stick_400Regular',
        fontSize: 32,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Stick_400Regular',
        fontSize: 20,
        textAlign: 'center',
        marginBottom:20,
      },
  });