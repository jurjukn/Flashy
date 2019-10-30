import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';


import decks from './flashcards'
import DecksList from './DecksList'
import Card from './Card'

const Row = props =>(
  <View>
      <Text>{props.name}</Text>
  </View>
)

export default class FlashyCards extends React.Component {

	// this is a shorthand way of writing a constructor when we only have state
	// there is a standard constructor here:
	// https://github.com/rrobbes/EngineeringOfMobileSystems/blob/master/lec4-ReactNative/todo-rn.js
  
  state = {
    	decks: decks,
      showDecks: false,
      deckToShow: 'none'
  }
  
  openDeck = deckName => {
    console.log('clicked: ' + deckName)
    console.log(this.state.decks.filter(deck => deck.name===deckName))
    this.setState({
      deckToShow: deckName,
      showDecks: true
    })
  }

	render() {
    
		return (
		
      <View style={styles.container}>
        <Text>HELLO FLASHY CAARDS</Text>
        <DecksList decks={this.state.decks} action={this.openDeck}/>
        {this.state.showDecks === true &&
          <Text> Value of deckToShow: {this.state.deckToShow} </Text>
        }

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
