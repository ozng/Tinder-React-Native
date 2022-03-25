import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';
import MessagesScreen from './screens/MessagesScreen';

import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {
                user ? (
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Chat" component={ChatScreen} />
                            <Stack.Screen name="Messages" component={MessagesScreen} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                            <Stack.Screen name='Modal' component={ModalScreen} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                            <Stack.Screen name='Match' component={MatchScreen} />
                        </Stack.Group>
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )
            }


        </Stack.Navigator>
    )
}

export default StackNavigator