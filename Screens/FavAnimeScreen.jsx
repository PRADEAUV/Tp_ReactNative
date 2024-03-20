import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image,Platform,ScrollView,Modal } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addAnime,RemoveAnime } from '../reducers/user';
export default function FavAnimeScreen() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const [SelectedAnime,setSelectedAnime]=useState(null);
    const [isModalVisible,setIsModalVisible]=useState(false);
    
    const toggleFav = (anime) => {
        if (user.animes.some((favAnime) => favAnime.title === anime.title)) {
            dispatch(RemoveAnime(anime));
        } else {
            dispatch(addAnime(anime));
        }
    };
    const OpenModal=(anime)=>{
        console.log(anime);
        setIsModalVisible(true);
        setSelectedAnime(anime);
        
      } 
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
            <View style={styles.see}><TouchableOpacity style={styles.button}><Text style={styles.textButton} onPress={()=>OpenModal(anime)} >See more</Text></TouchableOpacity></View>
            </View>
            ))}
        </ScrollView>
        )
    }
    }

    return (
    <SafeAreaView style={styles.container}>
        <Modal  visible={isModalVisible} transparent animationType="fade">
                    <ScrollView contentContainerStyle={styles.scrollView}>  
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <Text style={styles.titleCard}>{SelectedAnime?.title}</Text>
                          <Image style={styles.imageModal} source={{ uri: SelectedAnime?.images.jpg.large_image_url }} />
                          <Text style={styles.textCard}> Année: {SelectedAnime?.year ? SelectedAnime.year : "inconnue"}</Text>
                          <Text style={styles.textCard}> Genre: {SelectedAnime?.genres[0].name}</Text>
                          <Text style={styles.textCard}> Score: {SelectedAnime?.score}</Text>
                          <Text style={styles.synopsis}>{SelectedAnime?.synopsis}</Text> 
                          <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {setIsModalVisible(false);
                            
                            }}
                          >
                            <Text style={styles.textButton}>Close</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      </ScrollView>
                    </Modal>
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
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height:"100%",
        
      },
      modalContent: {
        width: '100%',
        height:"100%",
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      synopsis: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 22,
      },
      closeButton: {
        backgroundColor: '#8953c2',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
      },
      imageModal: {
        width: 200,
        height:250,
        marginLeft:15,
      },
  });