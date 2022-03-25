import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Foundation, Ionicons } from '@expo/vector-icons'
import tw from 'tailwind-rn'

const MessageHeader = ({ title, callEnabled, onPress, onPressCall }) => {
    return (
        <View style={tw('p-2 flex-row items-center justify-between')}>
            <View style={tw('flex flex-row items-center')}>
                <TouchableOpacity onPress={onPress} style={tw('p-2')}>
                    <Ionicons size={34} name="chevron-back-outline" color="#ff5864" />
                </TouchableOpacity>
                <Text style={tw('text-2xl font-bold pl-2')}>{title}</Text>
            </View>
            {
                callEnabled && (
                    <TouchableOpacity onPress={onPressCall} style={tw('rounded-full mr-4 px-3 py-2 bg-red-200')}>
                        <Foundation size={24} name="telephone" color="red" />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default MessageHeader

const styles = StyleSheet.create({})