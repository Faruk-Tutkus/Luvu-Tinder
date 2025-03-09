import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieWoman = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/7bf3d1a6-d58e-4481-8433-a611d0caa59a/R1JMG49O2V.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 80,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieWoman;
