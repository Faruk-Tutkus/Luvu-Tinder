import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieQuestion = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/86634c8a-9ab5-4185-ac2f-ccc780439d7a/vNNvHUD0rO.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 350,
        height: 350,
        justifyContent:'center',
        alignContent:'center',
        borderRadius: 15
    },
});

export default LottieQuestion;
