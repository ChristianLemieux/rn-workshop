import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { colors } from '../constants/Constants';

class ProfileScreen extends Component {
    state = { image: undefined };

    getPermissionsAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                throw new Error('Camera permissions are required to upload a photo!');
            }
        }
    };

    handleProfilePicPress = async () => {
        try {
            this.getPermissionsAsync();
        } catch (e) {
            alert(e);
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        const { image } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>My Profile Screen</Text>
                {image && (
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                )}
                <Button
                    title="Upload Profile Pic"
                    onPress={this.handleProfilePicPress}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mitBlue,
        color: 'white',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
});

export default ProfileScreen;