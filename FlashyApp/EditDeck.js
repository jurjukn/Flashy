import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


class EditDeck extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            renameDeckAction: this.props.renameDeckAction,
            oldDeckName: this.props.oldDeckName,
            newDeckName: '',
            isValid: false
        };
    }

    checkDeckName = (deckName) => {
        this.setState({newDeckName: deckName}, this.validateDeckName)
    }

    validateDeckName = () => {
        const formValid = (+this.state.newDeckName !== '' 
            && this.state.newDeckName.length > 0)
        this.setState({isValid: formValid})  
    }

    submitNewName = () => {
        this.state.renameDeckAction(this.state.newDeckName)
    }

    render(){
        return (
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder="enter new deck name"
                    onChangeText={this.checkDeckName}
                />
                <Button 
                    title="Rename deck" 
                    onPress={this.submitNewName}
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

export default EditDeck