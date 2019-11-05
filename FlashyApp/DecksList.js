import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import AddNewDeckForm from './AddNewDeckForm'


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

const Row = rowProps =>(
    <View>
        <Text> {rowProps.name} </Text> 
        <Button title={rowProps.name} onPress={() => rowProps.action(rowProps.selectedDeck)} />
    </View>
)

const DecksList = props => {
    
    return (
        <ScrollView>
            {props.decks.map(deck =>
                <Row    
                    key={deck.name}
                    selectedDeck={deck} 
                    name={deck.name} 
                    action={props.openDeckAction} 
                    renameDeckActionn={props.renameDeckAction} 
                />
            )}
            <Text>Add new deck</Text>
            <AddNewDeckForm addNewDeckAction={props.addNewDeckAction} />
        </ScrollView>
            
    )
}

export default DecksList