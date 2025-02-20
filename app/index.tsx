import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { View, Text, TextInput, Button, Alert } from 'react-native';
const LOCALHOST_URL = "localhost/5000"; // Korvaa oikealla IP:lläsi
const KOYEB_URL = "https://aggressive-coleen-iteee22-a25260f2.koyeb.app"



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
      const response = await axios.get(`${KOYEB_URL}/suosikit`);
        console.log('response', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
  };


  
  // Lisätään suosikki
  const lisaaSuosikki = async () => {
    try {
      const response = await axios.post(`${KOYEB_URL}/suosikit`, { itemName,  itemData});
        console.log('response', response.data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
  };


  const poistaSuosikki = async () => {
    try {
        // Make sure the id exists in itemData
        if (!itemData?.id) {
            Alert.alert("Error", "Item ID is missing.");
            return;
        }
        
        // Send DELETE request with item ID
        const response = await axios.delete(`${KOYEB_URL}/suosikit/${itemData.id}`);
        console.log('Poistettu suosikeista:', response.data);
        Alert.alert("Success", "Item removed from favorites.");
    } catch (error) {
        console.error('Virhe poistaessa suosikkia:', error.response ? error.response.data : error.message);
        Alert.alert("Error", "Failed to remove item from favorites.");
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

            <Button title="Päivitä data" onPress={handleFetch} />
            <Button title="Uusi data" onPress={handleButtonPress} />
            <Button title="Lisää suosikkeihin" onPress={lisaaSuosikki} />
            <Button title="Poista suosikeista" onPress={poistaSuosikki} />
            <Button title="Hae suoskit" onPress={haeSuosikit} />
            <Text>Suosikit {}</Text>
        </View>
    );
};

export default TarkovItem;