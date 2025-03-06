import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieHome = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/06009e75-e369-4719-9826-ec93df1a116c/GWJVxGSMGD.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 300,
        height: 250,
        justifyContent:'center',
        alignContent:'center'
    },
});

export default LottieHome;
