import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';


import decks from './flashcards'
import DecksList from './DecksList'
import CardsView from './CardsView'
import EditDeck from './EditDeck'


export default class FlashyCards extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      decks: decks,
      currentGameCardsList: [],
      gameStarted: false,
      editDeck: false
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
    console.log("Adding new deck")
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
      const newCardsList = this.state.currentGameCardsList.cards.filter((card) => card !== cardToDelete)
      const newDeck = this.state.currentGameCardsList
      newDeck.cards = []
      newDeck.cards = newCardsList
      this.setState({currentGameCardsList: newDeck})
      return this.state.currentGameCardsList
  }

  toggleEditDeck = (editMode) => {
    console.log("let me edit deck")
    const editDeck = editMode;
    this.setState({editDeck: editDeck})
  }

	render() {
		return (
      <View style={styles.mainContainer}>
        
        {this.state.gameStarted === false? (
            <View style={styles.appTitleContainer}>
              <Text style={styles.appTitle} number="1">Flashy Cards.</Text>
              <DecksList decks={this.state.decks} openDeckAction={this.openDeck} addNewDeckAction={this.addNewDeck} />
            </View>
        ) : (

          this.state.editDeck === true ? (
            <View style={styles.contentContainer}>
              <EditDeck
                currentDeck={this.state.currentGameCardsList}  
                renameDeckAction={this.renameDeck} 
                oldDeckName={this.state.currentGameCardsList.name}
                deleteDeckAction={this.deleteDeck}
                editDeckAction={this.toggleEditDeck}
                addNewDeckAction={this.addNewDeck}
              />

            </View>
            ) : (
            <View style={styles.contentContainer}>
              <CardsView 
                currentDeck={this.state.currentGameCardsList}
                changeDeckAction={this.startMainMenu} 
                deleteDeckAction={this.deleteDeck} 
                deleteCardAction={this.deleteCard}
                editDeckAction={this.toggleEditDeck}
              />
            </View>
          )
        )}
      </View>
		);
	}
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#B0E0E6",
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  appTitleContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 5,
    backgroundColor: "#F0F8FF",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5
  }
});
