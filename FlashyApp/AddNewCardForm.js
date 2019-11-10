import React, {Component} from 'react';
import { TextInput, Button, View, StyleSheet, Text } from 'react-native';

class AddNewCardForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            frontIsValid: false,
            backIsValid: false,
            cardFront: '',
            cardBack: '',
            deck: props.currentDeck,
            toggleFormAction: props.toggleForm
        };
    }

    checkCardFront = (cardProp) => {
        this.setState({cardFront: cardProp}, this.validateCardFront)
    }

    validateCardFront = () => {
        const formValid = (+this.state.cardFront !== '' 
            && this.state.cardFront.length > 0)
        this.setState({frontIsValid: formValid})  
    }

    checkCardBack = (cardProp) => {
        this.setState({cardBack: cardProp}, this.validateCardBack)
    }

    validateCardBack = () => {
        const formValid = (+this.state.cardBack !== '' 
            && this.state.cardBack.length > 0)
        this.setState({backIsValid: formValid})  
    }

    submitNewCard = () => {
        newCard = {front: this.state.cardFront, back: this.state.cardBack}
        newDeck = this.state.deck
        newDeck.cards.push(newCard)
        this.setState({
            deck: newDeck,
        })
        this.state.toggleFormAction(false)
    }

    render(){

        return(
            <View style={{flex:1, justifyContent:'space-evenly', padding:10}}>
                <Button 
                    title="Back to menu" 
                    color="#87CEFA"
                    onPress={()=>this.state.toggleFormAction(false)}
                />
                <View>
                    <Text>Card Front</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="enter card front"
                        placeholderTextColor="#F0F8FF"
                        onChangeText={this.checkCardFront}
                    />
                </View>
                <View>
                    <Text>Card Back</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="enter card back"
                        placeholderTextColor="#F0F8FF"
                        onChangeText={this.checkCardBack}
                    />
                </View>
                <Button 
                    title="Add" 
                    onPress={this.submitNewCard}
                    disabled={!(this.state.frontIsValid && this.state.backIsValid)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        borderColor: '#4682B4',
        borderWidth: 1,
        backgroundColor: "#E6E6FA",
        padding: 10,
        paddingBottom: 50,
        width:"100%",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#1E90FF"
    }
})

export default AddNewCardForm