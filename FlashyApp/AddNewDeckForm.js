import React, {Component} from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';


class AddNewDeckForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            addNewDeckAction: this.props.addNewDeckAction,
            deckName: '',
            isValid: false
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
        console.log("save new deck")
        const newDeck = {cards: [], name: this.state.deckName}
        this.state.addNewDeckAction(newDeck)
    }

    render(){
        return (
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder="enter deck name"
                    onChangeText={this.checkDeckName}
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