import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';

const KOYEB_URL = "https://aggressive-coleen-iteee22-a25260f2.koyeb.app";

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

const sellOrNot = (low, avg) => (low > avg ? 'Sell' : 'Do not sell');

const TarkovItem = () => {
    const [itemData, setItemData] = useState(null);
    const [itemName, setItemName] = useState('');
    const [suosikit, setSuosikit] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData('m855a1');
            if (data) setItemData(data);
        };
        loadData();
    }, []);
    
    const handleFetch = async () => {
        if (!itemName.trim()) {
            Alert.alert("Error", "Please enter an item name.");
            return;
        }
        const data = await fetchData(itemName);
        if (data) setItemData(data);
        else Alert.alert("Error", "Item not found.");
    };

    const haeSuosikit = async () => {
        try {
            const response = await axios.get(`${KOYEB_URL}/suosikit`);
            setSuosikit(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const lisaaSuosikki = async () => {
        try {
            await axios.post(`${KOYEB_URL}/suosikit`, { itemName });
            Alert.alert("Success", "Item added to favorites");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {itemData ? (
                <View style={styles.card}>
                    <Text style={styles.title}>Item: {itemData.name}</Text>
                    <Text>Last Low Price: {itemData.lastLowPrice}</Text>
                    <Text>Average 24h Price: {itemData.avg24hPrice}</Text>
                    <Text>Recommendation: {sellOrNot(itemData.lastLowPrice, itemData.avg24hPrice)}</Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <TextInput 
                placeholder="Enter item name" 
                value={itemName} 
                onChangeText={setItemName} 
                style={styles.input}
            />
            <Button title="Päivitä data" onPress={handleFetch} />
            <Button title="Lisää suosikkeihin" onPress={lisaaSuosikki} />
            <Button title="Listaa suosikit" onPress={haeSuosikit} />
            <Text style={styles.title}>Suosikit:</Text>
            {suosikit.map((item, index) => (
                <Text key={index}>{item.itemName}</Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    }
});

export default TarkovItem;
