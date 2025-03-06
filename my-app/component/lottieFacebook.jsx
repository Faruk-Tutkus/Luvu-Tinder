import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieFacebook = () => {
    return (
        <LottieView
            source={{ uri: "https://lottie.host/df2f3713-4695-4c7a-9d65-6a6190c2df0b/sgoK1Mb3FG.lottie" }}
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

export default LottieFacebook;
