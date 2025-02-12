import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// haetaan data tarkov-apista
const fetchData = async (itemName) => {
    const query = `{
        items(name: "${itemName}") {
            id
            name
            avg24hPrice
            lastLowPrice
            historicalPrices { timestamp, price }
        }
    }`;

    try {
        const response = await fetch('https://api.tarkov.dev/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        const json = await response.json();
        return json.data.items[0];
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


const sellOrNot = (low, avg) => {
    return low > avg ? 'Sell' : 'Do not sell';
};



const TarkovItem = () => {
    const [itemData, setItemData] = useState(null);
    const [itemName, setItemName] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData('m855a1');
            if (data) setItemData(data);
        };
        loadData();
    }, []);
    
    const handleFetch = async (itemName) => {
        const data = await fetchData(itemName);
        if (data) setItemData(data);
    };



    if (!itemData) {
        return <Text>Loading...</Text>;
    }


    // haetaan suosikit
  const haeSuosikit = async () => {
    try {
      const response = await axios.get('http://localhost:8081/suosikit');
        console.log('response', response.data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  // Lisätään suosikki
  const lisaaSuosikki = async () => {
    try {
      const response = await axios.post('http://localhost:8081/suosikit', { itemName });
        console.log('response', response.data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
  };


  
  const handleButtonPress = async () => {
    if (!itemName.trim()) {
        Alert.alert("Error", "Please enter an item name.");
        return;
    }

    console.log("Fetching data for:", itemName);

    const data = await fetchData(itemName); // Await the async fetch
    if (data) {
        setItemData(data);
    } else {
        Alert.alert("Error", "Item not found.");
        console.log("ei löydy")
    }
};


    return (
        <View>
            <Text>Item: {itemData.name}</Text>
            <Text>Last Low Price: {itemData.lastLowPrice}</Text>
            <Text>Average 24h Price: {itemData.avg24hPrice}</Text>
            <Text>Recommendation: {sellOrNot(itemData.lastLowPrice, itemData.avg24hPrice)}</Text>
            
            <TextInput 
                placeholder="Enter item name" 
                value={itemName} 
                onChangeText={setItemName} 
                style={{ borderWidth: 1, padding: 8, margin: 10 }}
            />

            <Button title="Refresh Item Data" onPress={handleFetch} />
            <Button title="New Item Data" onPress={handleButtonPress} />
            <Button title="Go to Favorites" onPress={() => navigation.navigate('favorites')} />
        </View>
    );
};

export default TarkovItem;