import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import AppTitleView from './AppTitleView'


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
            editDeckAction: props.editDeckAction,
            timer: null,
            minutesCounter: '00',
            secondsCounter: '00',
            timeSpentOnCard: 0
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    componentDidMount(){
        let timer = setInterval(() => {
            var num = (Number(this.state.secondsCounter) + 1).toString(),
              count = this.state.minutesCounter;
       
            if (Number(this.state.secondsCounter) == 59) {
              count = (Number(this.state.minutesCounter) + 1).toString();
              num = '00';
            }
       
            this.setState({
              minutesCounter: count.length == 1 ? '0' + count : count,
              secondsCounter: num.length == 1 ? '0' + num : num
            });
        }, 1000);

        this.setState({ timer });
    }

    onFlipCard = () => {
        const secondsOnCard = Number(this.state.secondsCounter) + Number(this.state.minutesCounter) * 60
        clearInterval(this.state.timer)
        this.setState({
            showFront: false,
            minutesCounter: '00',
            secondsCounter: '00',
            timeSpentOnCard: secondsOnCard
        })
    }

    reshuffleDeck = () => {
        const newDeck = this.state.deck

        const sortedByTimeCorrectCardsDeck = this.state.correctCardsDeck.sort(this.compareValues('secondsTaken'))
        sortedByTimeCorrectCardsDeck.map((objectt) => delete objectt['secondsTaken'])

        const sortedByTimeIncorrectCardsDeck = this.state.incorrectCardsDeck.sort(this.compareValues('secondsTaken'))
        sortedByTimeIncorrectCardsDeck.map((objectt) => delete objectt['secondsTaken'])

        newDeck.cards = sortedByTimeIncorrectCardsDeck.concat(sortedByTimeCorrectCardsDeck)
        this.setState({
            deck: newDeck, 
            firstDeckCard: this.assignDeckCard(this.state.deck.cards[0]),
            incorrectCardsDeck: [],
            correctCardsDeck: [],
            minutesCounter: '00',
            secondsCounter: '00',
        })
        clearInterval(this.state.timer)
    }

    removeCardFromDeck = () => {
        const newDeck = this.state.deck
        newDeck.cards.shift()        
        return newDeck
    }

    assignDeckCard = (card) => {
        this.componentDidMount()
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
            firstDeckCard: this.state.deck.cards[0],
            minutesCounter: '00',
            secondsCounter: '00',
        })
    }

    deleteCard = () => {
        const newDeck = this.state.deleteCardAction(this.state.firstDeckCard)
        this.setState({
            deck: newDeck, 
            firstDeckCard: newDeck.cards[0],
            minutesCounter: '00',
            secondsCounter: '00',
        })
    }

    addCardToCorrectCardsDeck = () => {
        temp =  {front: this.state.firstDeckCard.front, back: this.state.firstDeckCard.back, secondsTaken: this.state.timeSpentOnCard }
        this.setState({
            correctCardsDeck: [...this.state.correctCardsDeck, temp],
            showFront: true,
            deck: this.removeCardFromDeck(),
            firstDeckCard: this.assignDeckCard(this.state.deck.cards[0]),
        })
    }

    addCardToIncorrectCardsDeck = () => {
        temp =  {front: this.state.firstDeckCard.front, back: this.state.firstDeckCard.back, secondsTaken: this.state.timeSpentOnCard }
        this.setState({
            incorrectCardsDeck: [...this.state.incorrectCardsDeck, temp],
            showFront: true,
            deck: this.removeCardFromDeck(),
            firstDeckCard: this.assignDeckCard(this.state.deck.cards[0])
        })
    }
    compareValues(key) {
        return function(a, b) {
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
            comparison = 0;
            if (varA > varB) {
                comparison = 1
            } else if (varA < varB) {
                comparison = -1
            }
            return (
                comparison * -1
            )
        }
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <AppTitleView title={this.state.deck.name} />
                    <Button color="#87CEFA" title="Back to main menu" onPress={() => this.state.stopAction()} />
                </View>

                <Button title="Restart deck" onPress={()=>this.restartDeck()}/>
                <View style={styles.cardView}>
                    {this.state.firstDeckCard !== undefined ? (
                        this.state.showFront===true ? (   
                            <View style={{flex:1}}>
                                <View style={{flex:3, paddingTop:25, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={styles.cardTextStyle}>{this.state.firstDeckCard.front}</Text>
                                </View>
                                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={styles.timerTextStyle}>{this.state.minutesCounter} : {this.state.secondsCounter}</Text>
                                    <Button color="#6495ED" title="Flip" onPress={() => this.onFlipCard() }/>
                                </View>
                                <View style={{flex:1, alignItems:'stretch'}}>
                                    <Button color="#4169E1" title="Delete card" onPress={() => this.deleteCard()}/>
                                </View>
                            </View>
                        ) : (
                            <View style={{flex:1, justifyContent:'space-evenly'}}>
                                <View style={{alignItems:'center', justifyContent:'center'}}>
                                    <Text style={styles.cardTextStyle}>{this.state.firstDeckCard.back}</Text>
                                </View>
                                <View>
                                    <Button title="Right" onPress={()=> this.addCardToCorrectCardsDeck()} />
                                    <Button title="Wrong" onPress={()=> this.addCardToIncorrectCardsDeck()} />
                                </View>
                            </View>                
                        )
                    ) : (
                        <View>
                            <Text>
                                No cards in the deck. Please add cards or reshuffle deck
                            </Text>
                            <Button title="Reshuffle" onPress={() => this.reshuffleDeck()}/>
                        </View> 
                    )}
                </View>
                <View style={{flex:1}}>
                    <Button color="#483D8B" style={styles.editDeckBtn} title="Edit deck" onPress={()=>this.state.editDeckAction(true)}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardView: {
        flex:4,
        backgroundColor: "#E6E6FA",
        alignItems: 'center',
        justifyContent: 'center',
        // width:  "100%",
    },
    appTitleContainer: {
        backgroundColor: "#F0F8FF",
        padding: 5
    },
    appTitle: {
        fontSize: 35,
        color: "#FFFFFF",
        fontWeight: "bold",
        letterSpacing: 1,
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 5,
        textShadowColor: "#1E90FF"
    },
    cardTextStyle: {
        fontSize: 16,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#1E90FF"
    },
    timerTextStyle: {
        fontSize: 12,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#1E90FF"
    }

});

export default CardsView