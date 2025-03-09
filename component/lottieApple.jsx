import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieApple = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/a725dc04-3bec-4c67-8b61-13ef18179dc0/HLLaUGqEkB.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 40,
        height: 40,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieApple;
