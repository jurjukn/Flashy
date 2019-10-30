import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';


// styles for the components in this file
const styles = StyleSheet.create({
    contact: {marginLeft: 55, margin: 10},
    header: {
        fontSize: 24, 
        fontWeight: 'bold',
        paddingTop: 30,
        margin: 25
    }
})

const Row = props =>(
    <View>
        <Text> {props.name} </Text> 
        <Button title={props.name} onPress={() => props.action(props.name)} />
    </View>
)

// The component displaying the list visually
const DecksList = props => {
    
    return (
        
        <ScrollView>
          {props.decks.map(deck => <Row key={deck.name} name={deck.name} action={props.action} />)}
        </ScrollView>
            
    )
}

export default DecksList