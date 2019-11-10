import React, {Component} from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

class RenameDeckView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            renameDeckAction: this.props.renameDeckAction,
            oldDeckName: this.props.oldDeckName,
            newDeckName: '',
            isValid: false,
            toggleFormAction: props.toggleForm
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
        this.state.toggleFormAction(false)
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                <Button 
                    title="Back to menu" 
                    color="#87CEFA"
                    onPress={()=>this.state.toggleFormAction(false)}
                />
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
        borderColor: '#4682B4',
        borderWidth: 1,
        width:"100%",
        backgroundColor: "#E6E6FA",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#1E90FF"
    }
})

export default RenameDeckView