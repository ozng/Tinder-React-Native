import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, View, Image, Text } from 'react-native'
import BottomButtons from '../components/BottomButtons'
import Swiper from 'react-native-deck-swiper'
import tw from 'tailwind-rn'

import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import generateId from '../lib/generateId'


const HomeScreen = ({ navigation }) => {
    const { logout, user } = useAuth()
    const [profile, setProfile] = useState([])
    const swipeRef = useRef(null)

    useLayoutEffect(() => onSnapshot(doc(db, 'users', user.uid), snapshot => {
        if (!snapshot.exists()) {
            navigation.navigate('Modal');
        }
    }), [])

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            )

            const matches = await getDocs(collection(db, 'users', user.uid, 'matches')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            )

            const passedUserID = passes.length > 0 ? passes : ['test']
            const matchedUserID = matches.length > 0 ? matches : ['test']

            unsub = await onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...passedUserID, ...matchedUserID])), snapshop => {
                setProfile(snapshop.docs.filter(doc => doc.id !== user.uid).map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            })
        }

        fetchCards();
        return unsub;
    }, [db])

    const swipeLeft = (cardIndex) => {
        if (!profile[cardIndex]) return;

        const userSwipe = profile[cardIndex]

        setDoc(doc(db, 'users', user.uid, 'passes', userSwipe.id), userSwipe)
    }

    const swipeRight = async (cardIndex) => {
        if (!profile[cardIndex]) return;

        const userSwipe = profile[cardIndex]
        const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();

        getDoc(doc(db, 'users', userSwipe.id, 'matches', user.uid)).then(documentSnapshot => {
            if (documentSnapshot.exists()) {
                console.log("You matched" + userSwipe.displayName)
                setDoc(doc(db, 'users', user.uid, 'matches', userSwipe.id), userSwipe)

                setDoc(doc(db, 'matches', generateId(user.uid, userSwipe.id)), {
                    users: {
                        [user.uid]: loggedInProfile,
                        [userSwipe.id]: userSwipe
                    },
                    usersMatched: [user.uid, userSwipe.id],
                    timestamp: serverTimestamp()
                })

                navigation.navigate('Match', {
                    loggedInProfile, userSwipe
                })
            } else {
                setDoc(doc(db, 'users', user.uid, 'matches', userSwipe.id), userSwipe)
            }
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaforAndroid} >
            <Header navigateModal={() => navigation.navigate('Modal')} navigateMessages={() => navigation.navigate('Chat')} />
            {/* Card Look */}
            <View style={tw('flex-1 -mt-6')}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={styles.swiperContainer}
                    cards={profile}
                    stackSize={5}
                    cardIndex={0}
                    verticalSwipe={false}
                    animateCardOpacity
                    onSwipedLeft={(cardIndex) => {
                        swipeLeft(cardIndex)
                    }}
                    onSwipedRight={(cardIndex) => {
                        swipeRight(cardIndex)
                    }}
                    renderCard={card => card ? (
                        <View key={card.id} style={tw('relative bg-white h-3/4 rounded-xl')}>
                            <Image resizeMode='cover' source={{ uri: card.photoURL }} style={tw('h-full w-full rounded-xl')} />
                            <View style={[tw('absolute bottom-0 flex-row  justify-between items-center bg-white w-full h-20 px-6 py-2 rounded-b-xl'), styles.cardShadow]}>
                                <View>
                                    <Text style={tw('text-xl font-bold')}>{card.displayName}</Text>
                                    <Text>{card.job}</Text>
                                </View>
                                <View>
                                    <Text style={tw('text-2xl font-bold')}>{card.age}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={[tw('relative bg-white h-3/4 rounded-xl justify-center items-center'), styles.cardShadow]}>
                            <Text style={tw('font-bold pb-5')}>No More Profiles</Text>

                            <Image style={[tw('h-20 w-full'), { height: 100, width: 100 }]} source={{ uri: "https://links.papareact.com/6gb" }} />
                        </View>
                    )
                    }
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    textAlign: 'right',
                                    color: 'red'
                                }
                            }
                        },
                        right: {
                            title: 'MATCH',
                            style: {
                                label: {
                                    color: '#4ded30'
                                }
                            }
                        }
                    }}
                />
            </View>
            {/* Card Look */}
            <View style={styles.btnContainer}>
                <BottomButtons onPress={() => swipeRef.current.swipeLeft()} iconType="entypo" iconName="cross" iconColor="red" iconSize={24} bgColor={'rgba(255,0,0,0.2)'} />
                <BottomButtons onPress={() => swipeRef.current.swipeRight()} iconType="antdesign" iconName="heart" iconColor="green" iconSize={24} bgColor={'rgba(0,255,0,0.2)'} />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    safeAreaforAndroid: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'white'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40
    },
    swiperContainer: {
        backgroundColor: 'transparent'
    },
    cardShadow: {
        elevation: 5
    }
})
