import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const favorites = () => {
     const navigation = useNavigation();

    return (
        <View>
            
            <Text>jeejee</Text>
            
           
            <Button title="Go Backt to Home" onPress={() => navigation.navigate('index')} />
        </View>
    );
};

export default favorites;