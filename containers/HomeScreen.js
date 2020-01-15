import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { image: undefined };
    }

    makeCatImageRequest = () => {
        return fetch('https://api.thecatapi.com/v1/images/search', {
            headers: {
                'x-api-key': '3f7747b2-1ad1-489a-bdec-e39741f3a67c',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson[0].url);
            this.setState(
            {
                image: responseJson[0].url,
            },
            function() {}
            );
        })
        .catch(error => {
            console.error(error);
        });
    };

    componentDidMount() {
        this.makeCatImageRequest();
    }

    render() {
        let img;
        if (this.state.image != undefined) {
            console.log(this.state.image);
            img = <Image style={styles.imageStyle} source={{uri: this.state.image}} />;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}> The REAL Catbook </Text>
                {img}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        color: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleText: {
        flex: 1,
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    imageStyle: {
        flex: 2,
        height: 300,
        width: 300,
        resizeMode: 'contain'
    }
});

export default HomeScreen;