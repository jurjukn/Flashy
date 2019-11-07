import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';


class CardsView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            showFront: true,
            deck: this.props.currentDeck,
            stopAction: this.props.changeDeckAction,
            correctCardsDeck: [],
            incorrectCardsDeck: [],
            firstDeckCard: this.props.currentDeck.cards[0],
            deleteDeckAction: props.deleteDeckAction,
            deleteCardAction: props.deleteCardAction,
            editDeckAction: props.editDeckAction
        };
    }

    reshuffleDeck = () => {
        newDeck = this.state.deck
        newDeck.cards = this.state.incorrectCardsDeck.concat(this.state.correctCardsDeck)
        console.log(newDeck)
        return newDeck
    }

    removeCardFromDeck = () => {
        const newDeck = this.state.deck
        newDeck.cards.shift()        
        return newDeck
    }

    assignDeckCard = (card) => {
        const firstCard = card
        return firstCard
    }

    restartDeck = () => {
        newDeck = this.state.deck
        newDeck.cards = (this.state.incorrectCardsDeck.concat(this.state.deck.cards)).concat(this.state.correctCardsDeck)
        this.setState({
            deck: newDeck,
            incorrectCardsDeck: [],
            correctCardsDeck: [],
            firstDeckCard: this.state.deck.cards[0]
        })
    }

    deleteCard = () => {
        const newDeck = this.state.deleteCardAction(this.state.firstDeckCard)
        this.setState({deck: newDeck, firstDeckCard: newDeck.cards[0]})
    }

    render(){
        return (
            <View>
                <Button style={styles.editDeckBtn} title="Edit deck" onPress={()=>this.state.editDeckAction(true)}/>
                <Button title="Restart deck" onPress={()=>this.restartDeck()}/>
                <View style={styles.cardView}>
                    { this.state.firstDeckCard !== undefined ? (
                        <Text>
                            {this.state.showFront===true ?( 
                                this.state.firstDeckCard.front 
                                ) : (
                                this.state.firstDeckCard.back 
                            )} 
                        </Text>
                        ) : (
                            <Text>
                                You viewed all the cards. Time to reshuffle the deck!
                            </Text>
                        )
                    }
                    {this.state.showFront===true ? (

                        this.state.firstDeckCard !== undefined ? (
                            <View>
                                <Button title="Flip" onPress={() => this.setState({showFront: false} ) }/>
                                <Button 
                                    title="Delete card" 
                                    onPress={() => this.deleteCard()}
                                />
                            </View>
                        ) : (
                            <Button title="Reshuffle" onPress={() => this.setState({
                                deck: this.reshuffleDeck(), 
                                firstDeckCard: this.assignDeckCard(this.state.deck.cards[0]),
                                incorrectCardsDeck: [],
                                correctCardsDeck: []
                            })}
                            />
                        )

                    ) : (
                        <View>
                            <Button title="Right" onPress={()=> this.setState({
                                    correctCardsDeck: [...this.state.correctCardsDeck, this.state.firstDeckCard],
                                    showFront: true,
                                    deck: this.removeCardFromDeck(),
                                    firstDeckCard: this.assignDeckCard(this.state.deck.cards[0])
                                }
                            )} />
                            <Button title="Wrong" onPress={()=> this.setState({
                                    incorrectCardsDeck: [...this.state.incorrectCardsDeck, this.state.firstDeckCard],
                                    showFront: true,
                                    deck: this.removeCardFromDeck(),
                                    firstDeckCard: this.assignDeckCard(this.state.deck.cards[0])
                                }
                            )} />
                        </View>                
                    )}
                </View>
                <Button title="Choose another topic" onPress={() => this.state.stopAction()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: "60%",
        width:  350,
    },
    editDeckBtn: {

    }
});

export default CardsView