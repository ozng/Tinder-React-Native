import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth'

const LoginScreen = ({ navigation }) => {
    const { signInWithGoogle, loading } = useAuth();
    return (
        <View style={tw("flex-1")}>
            <ImageBackground resizeMode="cover" style={tw("flex-1")} source={{ uri: "https://tinder.com/static/tinder.png" }}>
                {
                    !loading && (
                        <TouchableOpacity
                            onPress={signInWithGoogle}
                            disabled={loading}
                            style={[
                                tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
                                { marginHorizontal: '25%' },
                            ]}
                        >
                            <Text
                                style={tw("font-semibold text-center")}
                            >Sign in & get swiping
                            </Text>

                        </TouchableOpacity>
                    )
                }
            </ImageBackground>
        </View>
    )
}

export default LoginScreen
