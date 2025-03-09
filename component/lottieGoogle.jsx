import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieGoogle = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/6ea96f89-de52-45eb-a144-68b4fd5c14e8/IgUPEmjVYR.lottie" }}
            autoPlay
            loop
            style={styles.animation}
        />
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 35,
        height: 35,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: 20,
        borderRadius: 15
    },
});

export default LottieGoogle;
