import { Dimensions } from 'react-native';

const { screenWidth, screenHeight } = Dimensions.get('window');

export const colors = {
    mitBlue: '#386dff',
    tabIconSelected: 'orange',
    tabIconDefault: 'purple',
};

export const layout = {
    width: screenWidth,
    height: screenHeight,
};
