import React, {Component} from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';


class AddNewDeckForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            addNewDeckAction: this.props.addNewDeckAction,
            deckName: '',
            isValid: false,
            finishedAddingAction: props.finishedAddingAction
        };
    }

    checkDeckName = (deckName) => {
        this.setState({deckName: deckName}, this.validateDeckName)
    }

    validateDeckName = () => {
        const formValid = (+this.state.deckName !== '' 
            && this.state.deckName.length > 0)
        this.setState({isValid: formValid})  
    }

    submitNewDeck = () => {
        const newDeck = {cards: [], name: this.state.deckName}
        this.state.addNewDeckAction(newDeck)
        this.setState({deckName: ''})
        this.state.finishedAddingAction()
    }

    render(){
        return (
            <View>
                <Button 
                    title="Back" 
                    onPress={()=>this.state.finishedAddingAction()}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="enter deck name"
                    onChangeText={this.checkDeckName}
                    value={this.state.deckName}
                />
                <Button 
                    title="Add deck" 
                    onPress={()=>this.submitNewDeck()}
                    disabled={!this.state.isValid}
                />
            </View>
        )
    }  
}
const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
    }
})

export default AddNewDeckForm