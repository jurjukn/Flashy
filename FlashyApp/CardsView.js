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
            <View>
                <Button style={styles.editDeckBtn} title="Edit deck" onPress={()=>this.state.editDeckAction(true)}/>
                <Button title="Restart deck" onPress={()=>this.restartDeck()}/>
                <View style={styles.cardView}>
                    {this.state.firstDeckCard !== undefined ? (
                        this.state.showFront===true ? (   
                            <View>
                                <Text>{this.state.firstDeckCard.front}</Text>
                                <Text>{this.state.minutesCounter} : {this.state.secondsCounter}</Text>
                                <Button title="Flip" onPress={() => this.onFlipCard() }/>
                                <Button title="Delete card" onPress={() => this.deleteCard()}
                                />
                            </View>
                        ) : (
                            <View>
                                <Text>{this.state.firstDeckCard.back}</Text>
                                <Button title="Right" onPress={()=> this.addCardToCorrectCardsDeck()} />
                                <Button title="Wrong" onPress={()=> this.addCardToIncorrectCardsDeck()} />
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