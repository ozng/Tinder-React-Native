import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import tw from 'tailwind-rn'
import { Ionicons } from '@expo/vector-icons'

import useAuth from '../hooks/useAuth'

const Header = ({ navigateMessages, navigateModal }) => {
    const { user, logout } = useAuth()

    return (
        <>
            <View style={tw('flex-row items-center justify-between px-5')}>
                <TouchableOpacity onPress={logout}>
                    <Image style={tw('h-10 w-10 rounded-full')} source={{ uri: user.photoURL }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateModal}>
                    <Image style={tw('h-14 w-14 rounded-full')} source={require('../assets/logo/Tinder-Emblem.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateMessages}>
                    <Ionicons name='chatbubbles-sharp' size={24} color="#FF5864" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({})