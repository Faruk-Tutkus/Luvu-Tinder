import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieWelcome = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/cbced932-68e2-41a4-87a8-5407724392dd/WkLY0n8N8M.lottie" }}
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
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieWelcome;
