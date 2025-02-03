import React from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


export default function Index() {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Mobiiliappi</Text>
      
      <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />

      <Button
        onPress={() => alert("Painiketta painettu")}
        title="Paina tästä"
        color="#841584"
        accessibilityLabel="Lisä tietoa"
      />
      </SafeAreaView>
    </SafeAreaProvider>
    </View>

    
    
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
