import React, {Component} from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
    }
})

class AddNewCardForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            frontIsValid: false,
            backIsValid: false,
            cardFront: '',
            cardBack: '',
            deck: props.currentDeck,
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
    }

    render(){

        return(
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder="enter card front"
                    onChangeText={this.checkCardFront}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="enter card back"
                    onChangeText={this.checkCardBack}
                />
                <Button 
                    title="Add new card" 
                    onPress={this.submitNewCard}
                    disabled={!(this.state.frontIsValid && this.state.backIsValid)}
                />
            </View>
        )
    }

}

export default AddNewCardForm