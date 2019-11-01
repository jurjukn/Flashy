import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';


import decks from './flashcards'
import DecksList from './DecksList'
import CardsView from './CardsView'

export default class FlashyCards extends React.Component {

	// this is a shorthand way of writing a constructor when we only have state
	// there is a standard constructor here:
	// https://github.com/rrobbes/EngineeringOfMobileSystems/blob/master/lec4-ReactNative/todo-rn.js
  
  constructor(props) {
    super(props)
    this.state = {
      decks: decks,
      currentGameCardsList: [],
      gameStarted: false,
    }
  }
  
  startMainMenu = () => {
    this.setState({
      currentGameCardsList: [],
      gameStarted: false
    })
  }

  restartDeck = () => {
    console.log("restarting deck")
  }

  openDeck = (selectedDeck) => {
    this.setState({
      currentGameCardsList: selectedDeck,
      gameStarted: true
    })
  }

	render() {
		return (
      <View style={styles.container}>
        <Text>HELLO FLASHY CAARDS</Text>
        <Text> Value of deckToShow: {this.state.currentGameCardsList.name} </Text>
        
        {this.state.gameStarted === false? (
          <DecksList decks={this.state.decks} action={this.openDeck}/>
        ) : (
          <CardsView currentDeck={this.state.currentGameCardsList} changeDeckAction={this.startMainMenu} restartDeckAction={this.restartDeck} />
        )}

      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
});
