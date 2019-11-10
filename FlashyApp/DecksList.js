import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import AddNewDeckForm from './AddNewDeckForm'

const styles = StyleSheet.create({
    deckBtnView: {
        padding: 10,
        
    }
})

const Row = rowProps =>(
    <View style={styles.deckBtnView}>
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
            <View style={{flex:1}}>
                { this.state.showAddNewDeckForm === false ? (
                <ScrollView>
                <View style={{flex:1}}>
                    {this.state.decks.map(deck =>
                        <Row    
                            key={deck.name}
                            selectedDeck={deck} 
                            name={deck.name} 
                            action={this.state.openDeckAction} 
                            renameDeckActionn={this.state.renameDeckAction} 
                        />
                    )}
                    <Button color="#483D8B" style={styles.deckBtnView} title="Add New Deck" onPress={()=> this.setState({showAddNewDeckForm: true})}/>
                </View>
                </ScrollView>
                ) : (
                <View style={{flex:1}}>
                    <AddNewDeckForm addNewDeckAction={this.state.addNewDeckAction} finishedAddingAction={this.finishedAddingAction}/>
                </View>
                )}
            </View>
            
        )
    }
}


export default DecksList