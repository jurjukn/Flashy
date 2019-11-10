import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Constants from 'expo-constants'

import AddNewCardForm from './AddNewCardForm'
import AppTitleView from './AppTitleView'
import RenameDeckView from './RenameDeckForm'


class EditDeck extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            deck: this.props.currentDeck,
            renameDeckAction: this.props.renameDeckAction,
            deleteDeckAction: props.deleteDeckAction,
            editDeckAction: props.editDeckAction,
            showAddCardForm: false,
            showRenameDeckForm: false
        };
    }

    toggleAddingNewCardForm = (toggleOption) => {
        this.setState({showAddCardForm: toggleOption})
    } 

    toggleDeckRenameForm = (toggleOption) => {
        this.setState({showRenameDeckForm: toggleOption})
    }

    render(){
        return (
            <View style={{flex:1}}>
                
                    { this.state.showAddCardForm === true || this.state.showRenameDeckForm === true ? (
                        <View>
                            {this.state.showAddCardForm === true ? (
                                <AddNewCardForm currentDeck={this.state.deck} toggleForm={this.toggleAddingNewCardForm} />
                            ) : (
                                <RenameDeckView renameDeckAction={this.state.renameDeckAction} toggleForm={this.toggleDeckRenameForm}/>
                            )}
                        </View>
                        ) : (
                            <View style={{flex:1}}>
                                <View style={{flex:1}}>
                                    <AppTitleView title={this.state.deck.name} />
                                    <Button color="#87CEFA" title="Back to playing" onPress={() => this.state.editDeckAction(false)} />
                                </View>
                                <View style={{flex:1, justifyContent:'space-evenly'}}>
                                    <Button title="Add card to deck" onPress={() => this.toggleAddingNewCardForm(true)} />
                                    <Button title="Rename deck" onPress={() => this.toggleDeckRenameForm(true)} />
                                    <Button color="#000080" title="Delete deck" onPress={() => this.state.deleteDeckAction(this.state.deck)} />
                                </View>
                            </View>
                        )
                    }   
                
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        padding:50
    },
    btnStyle: {
        marginTop: 10,
        padding: 50,
        color: "red"
    }
})

export default EditDeck