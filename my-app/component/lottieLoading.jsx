import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieLoading = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/d6892d93-4af8-4ed5-b381-1da36c86ca78/ZI3dFvCBfc.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 300,
        height: 300,
    },
});

export default LottieLoading;
