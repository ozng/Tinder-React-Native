import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView } from 'react-native'
import MessageHeader from '../components/MessageHeader'
import tw from 'tailwind-rn';
import ChatList from '../components/ChatList';

const ChatScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeAreaforAndroid}>
            <MessageHeader title="Chat" onPress={() => navigation.goBack()} />
            <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    safeAreaforAndroid: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'white'
    }
})
