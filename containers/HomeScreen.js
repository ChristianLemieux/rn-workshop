import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { image: undefined, backgroundColor: 'purple' };
    }

    onSwipeLeft = () => {
        this.setState({
            backgroundColor: 'green',
        }, this.makeCatImageRequest);
        this.makeCatImageRequest();
    };

    onSwipeRight = () => {
        this.setState({
            backgroundColor: 'red',
        }, this.makeCatImageRequest);
    };

    makeCatImageRequest = () => {
        return fetch('https://api.thecatapi.com/v1/images/search', {
            headers: {
                'x-api-key': '3f7747b2-1ad1-489a-bdec-e39741f3a67c',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            // console.log(responseJson[0].url);
            this.setState({
                image: responseJson[0].url,
            }, null);
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
            // console.log(this.state.image);
            img = 
                <GestureRecognizer
                    onSwipeLeft={this.onSwipeLeft}
                    onSwipeRight={this.onSwipeRight}
                >
                    <Image style={styles.imageStyle} source={{uri: this.state.image}} />
                </GestureRecognizer>;
        }
        return (
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}> The REAL Catbook </Text>
                </View>
                <View style={styles.imageContainer}>
                    {img}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    imageContainer: {
        flex: 4,
    },
    titleText: {
        flex: 1,
        paddingTop: 100,
        color: 'white',
        fontSize: 30,
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: 300,
        resizeMode: 'contain',
    }
});

export default HomeScreen;