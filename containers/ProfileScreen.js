import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { colors } from '../constants/Constants';

class ProfileScreen extends Component {
    state = { image: undefined };

    getPermissionsAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                throw new Error('Camera roll permissions are required to upload a photo!');
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
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    handleRemovePicPress = () => {
        this.setState({ image: undefined });
    };

    render() {
        const { image } = this.state;
        return (
            <View style={styles.container}>
                {image && (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                )}
                {!image && (
                    <View style={styles.profileImage} />
                )}
                <TouchableOpacity
                    onPress={this.handleProfilePicPress}
                    style={[styles.button, { backgroundColor: '#e9693a'}]}
                >
                    <Text style={styles.text}>Upload Profile Pic</Text>
                </TouchableOpacity>
                {image && (
                    <TouchableOpacity
                        onPress={this.handleRemovePicPress}
                        style={[styles.button, { backgroundColor: '#747e95' }]}
                    >
                        <Text style={styles.text}>Remove Pic</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mitBlue,
        color: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#86a7ff',
        marginBottom: 32,
    },
    button: {
        borderRadius: 3,
        padding: 15,
        width: 180,
        marginBottom: 10,
    },
});

export default ProfileScreen;