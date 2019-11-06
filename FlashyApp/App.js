import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';


import decks from './flashcards'
import DecksList from './DecksList'
import CardsView from './CardsView'
import EditDeck from './EditDeck'

//Testing git

export default class FlashyCards extends React.Component {
  
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

  openDeck = (selectedDeck) => {
    this.setState({
      currentGameCardsList: selectedDeck,
      gameStarted: true
    })
  }

  renameDeck = (newName) => {
    const currDeck = this.state.currentGameCardsList
    currDeck.name = newName
    this.setState({currentGameCardsList: currDeck})
  }

  addNewDeck = (newDeck) => {
    const newDecks = this.state.decks
    newDecks.push(newDeck)
    this.setState({decks: newDecks})
  }

  deleteDeck = (deckToDelete) => {
    const newDecks = this.state.decks.filter((deck) => deck !== deckToDelete)
    this.setState({decks: newDecks})
    this.startMainMenu()
  }

  deleteCard = (cardToDelete) => {
      // console.log("I will delete this card")
      // console.log(cardToDelete)
      // console.log(this.state.currentGameCardsList)
      const newCardsList = this.state.currentGameCardsList.cards.filter((card) => card !== cardToDelete)
      const newDeck = this.state.currentGameCardsList
      newDeck.cards = []
      newDeck.cards = newCardsList
      this.setState({currentGameCardsList: newDeck})
      // console.log(this.state.currentGameCardsList)
      return this.state.currentGameCardsList
  }

	render() {
		return (
      <View style={styles.container}>
        <Text>HELLO FLASHY CAARDS</Text>
        <Text> Value of deckToShow: {this.state.currentGameCardsList.name} </Text>
        
        {this.state.gameStarted === false? (
            <DecksList decks={this.state.decks} openDeckAction={this.openDeck} addNewDeckAction={this.addNewDeck} />
        ) : (
          <View>
            <EditDeck  renameDeckAction={this.renameDeck} oldDeckName={this.state.currentGameCardsList.name} />
            <CardsView 
              currentDeck={this.state.currentGameCardsList}
              changeDeckAction={this.startMainMenu} 
              deleteDeckAction={this.deleteDeck} 
              deleteCardAction={this.deleteCard}
            />
          </View>
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
