import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const fetchData = async () => {
    const query = `{
        items(name: "m856a1") {
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
    const [itemName, setItemName] = useState('m856a1');
    const navigation = useNavigation();
    
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            if (data) setItemData(data);
        };
        loadData();
    }, []);
    
    const handleFetch = async () => {
        const data = await fetchData();
        if (data) setItemData(data);
    };

    if (!itemData) {
        return <Text>Loading...</Text>;
    }

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
            <Button title="Fetch Item Data" onPress={handleFetch} />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default TarkovItem;