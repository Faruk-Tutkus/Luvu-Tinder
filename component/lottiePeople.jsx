import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieMan = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/fcb43851-0c6e-4d0d-a099-ae6167d4e593/DBzKcgsnW0.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 75,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieMan;
