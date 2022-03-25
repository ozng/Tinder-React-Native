import { StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase';

const ModalScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [image, setImage] = useState(null)
    const [job, setJob] = useState(null)
    const [age, setAge] = useState(null)

    const incompleteform = !image || !job || !age;

    const updateProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        })
            .then(() => navigation.navigate('Home'))
            .catch((err) => console.log(err.message))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw('bg-white flex-1 items-center pt-1')}>
                <Image
                    style={tw('h-20 w-full')}
                    resizeMode="contain"
                    source={{ uri: 'https://links.papareact.com/2pf' }}
                />

                <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome {user.displayName}</Text>

                <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 1: The Profile Picture</Text>
                <TextInput value={image} onChangeText={text => setImage(text)} placeholder="Enter a Profile Picture URL" />

                <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 2: The Job</Text>
                <TextInput value={job} onChangeText={text => setJob(text)} placeholder="Enter a your occupation" />

                <Text style={tw('text-center p-4 font-bold text-red-400')}>Step 3: The Age</Text>
                <TextInput maxLength={2} value={age} onChangeText={text => setAge(text)} placeholder="Enter your age" />

                <TouchableOpacity
                    onPress={updateProfile}
                    disabled={incompleteform}
                    style={[tw('bg-red-400 w-64 p-3 rounded-xl absolute bottom-10'), incompleteform && tw('bg-gray-400')]}>
                    <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ModalScreen

const styles = StyleSheet.create({})