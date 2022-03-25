import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'
import React from 'react'

const MatchScreen = ({ navigation, route }) => {
    const { loggedInProfile, userSwipe } = route?.params;

    return (
        <View style={[tw('h-full bg-red-500 pt-20'), { opacity: 0.89 }]}>
            <View style={tw('justify-center px-10 pt-20')}>
                <Image resizeMode='contain' style={{ width: '100%', height: 100 }} source={{ uri: "https://links.papareact.com/mg9" }} />
            </View>
            <Text style={tw('text-white text-center mt-5')}>You and {userSwipe.displayName} have liked each other.</Text>
            <View style={tw('flex-row justify-evenly mt-5')}>
                <Image
                    style={tw('h-32 w-32 rounded-full')}
                    source={{ uri: loggedInProfile.photoURL }}
                />
                <Image
                    style={tw('h-32 w-32 rounded-full')}
                    source={{ uri: userSwipe.photoURL }}
                />
            </View>

            <TouchableOpacity
                style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate('Chat');
                }}
            >
                <Text style={tw('text-center')}>Send a Message</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MatchScreen

const styles = StyleSheet.create({})