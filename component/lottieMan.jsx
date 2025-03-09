import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieMan = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/0ad21ed6-b1e4-46f7-8b8a-8f7cedb7cef0/Dlw4bFU7Dx.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 100,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieMan;
