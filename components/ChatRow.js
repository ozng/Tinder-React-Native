import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth()

    const [matchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState("Say hi")

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user])

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), snapshot => {
            setLastMessage(snapshot.docs[0]?.data()?.message)
        })
    }, [matchDetails, db])

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Messages', { matchedUserInfo: matchedUserInfo, matchDetails: matchDetails })} style={tw('flex-row items-center m-3')}>
                <Image
                    source={{ uri: matchedUserInfo?.photoURL }}
                    style={tw('rounded-full h-16 w-16 mr-4')}
                />

                <View>
                    <Text style={tw('text-lg font-semibold')}>{matchedUserInfo?.displayName}</Text>
                    <Text>{lastMessage}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: '#ff5864', borderBottomWidth: 1, opacity: 0.3 }} />
        </>
    )
}

export default ChatRow