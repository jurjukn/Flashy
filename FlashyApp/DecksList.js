import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import AddNewDeckForm from './AddNewDeckForm'

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
        <Button title={rowProps.name} onPress={() => rowProps.action(rowProps.selectedDeck)} />
    </View>
)

class DecksList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            decks: props.decks,
            openDeckAction: props.openDeckAction,
            addNewDeckAction: props.addNewDeckAction,
            showAddNewDeckForm: false
        };
    }
    finishedAddingAction = () => {
        this.setState({showAddNewDeckForm: false})
    }
    render(){
        return (
            <ScrollView>
                { this.state.showAddNewDeckForm === false ? (
                <View>
                    {this.state.decks.map(deck =>
                        <Row    
                            key={deck.name}
                            selectedDeck={deck} 
                            name={deck.name} 
                            action={this.state.openDeckAction} 
                            renameDeckActionn={this.state.renameDeckAction} 
                        />
                    )}
                    <Button title="Add Deck" onPress={()=> this.setState({showAddNewDeckForm: true})}/>
                </View>
                ) : (
                <View>
                    <Text>Add new deck</Text>
                    <AddNewDeckForm addNewDeckAction={this.state.addNewDeckAction} finishedAddingAction={this.finishedAddingAction}/>
                </View>
                )}

            </ScrollView>
        )
    }
}


export default DecksList