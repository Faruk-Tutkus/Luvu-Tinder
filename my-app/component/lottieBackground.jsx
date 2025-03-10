import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieHome = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/0f727761-1b6b-415a-86f4-1c5757167840/lqHuBOzppE.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignContent:'center',
        position:'absolute'
    },
});

export default LottieHome;
