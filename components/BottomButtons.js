import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, AntDesign } from '@expo/vector-icons'

const BottomButtons = ({ iconType, iconName, iconSize, iconColor, onPress, bgColor }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={onPress}>
            {
                iconType === "entypo" && <Entypo name={iconName} size={iconSize} color={iconColor} />
            }
            {
                iconType === "antdesign" && <AntDesign name={iconName} size={iconSize} color={iconColor} />
            }

        </TouchableOpacity>
    )
}

export default BottomButtons

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 50,
    }
})