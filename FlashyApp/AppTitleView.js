import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    appTitleContainer: {
        backgroundColor: "#F0F8FF",
        padding: 5,
    },
    appTitle: {
        fontSize: 35,
        color: "#FFFFFF",
        // fontWeight: 'bold',
        letterSpacing: 1,
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 5,
        textShadowColor: "#1E90FF"
    },
})

const AppTitleView = (props) => {
    return(
    <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle} number="1">{props.title}</Text>
    </View>
    )
}

export default AppTitleView