import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

class CardsView extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = { 
            showFront: true,
            cardIndex: 0,
            deck: this.props.currentDeck,
            stopAction: this.props.changeDeckAction,
            restartDeckAction: this.props.restartDeckAction
        };
    }

    render(){
        return (
            <View>
                <Button title="Restart deck" onPress={() => this.state.restartDeckAction()} />
                <View style={styles.cardView}>
                    {console.log("cardIndex: " + this.state.cardIndex + " length:" + this.state.deck.cards.length)}
                    <Text>{this.state.showFront===true ? this.state.deck.cards[this.state.cardIndex].front : this.state.deck.cards[this.state.cardIndex].back } </Text>

                    {this.state.showFront===true ? (
                        <Button title="Flip" onPress={() => this.setState({showFront: false} ) }/>
                    ) : (
                        <View>
                            <Button title="Right" onPress={()=> this.setState({
                                    showFront: true,
                                    cardIndex: (this.state.cardIndex < this.state.deck.cards.length-1)? (this.state.cardIndex+1) : (0)
                                }
                            )} />
                            <Button title="Wrong" onPress={()=> this.setState({
                                    showFront: true,
                                    cardIndex: (this.state.cardIndex < this.state.deck.cards.length-1)? (this.state.cardIndex+1) : (0)
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
        marginBottom: "10%"
    },
});

export default CardsView