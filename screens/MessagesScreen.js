import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import MessageHeader from '../components/MessageHeader'
import tw from 'tailwind-rn'
import ReceiverMessage from '../components/ReceiverMessage'
import SenderMessage from '../components/SenderMessage'
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'

const MessagesScreen = ({ navigation, route }) => {
    const params = route.params;
    const { matchedUserInfo, matchDetails } = params;
    const { user } = useAuth();

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })

        return unsub;
    }, [matchDetails, db])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input
        })

        setInput("")
    }

    return (
        <SafeAreaView style={styles.safeAreaforAndroid}>
            <MessageHeader title={matchedUserInfo.displayName} callEnabled onPress={() => navigation.goBack()} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw('flex-1')}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <FlatList
                        data={messages}
                        style={tw('pl-4')}
                        inverted={-1}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) => (
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        )}
                    />
                </TouchableWithoutFeedback>
                <View style={tw("flex-row bg-white justify-between items-center border-t border-gray-200 px-5 py-2")}>
                    <TextInput
                        style={tw('h-10 text-lg')}
                        placeholder="Send a message"
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    safeAreaforAndroid: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'white'
    },
    btnText: {
        color: '#FF5864',
        fontSize: 18
    }
})