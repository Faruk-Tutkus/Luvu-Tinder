import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieLuvu = ({loop, autoPlay, ref}) => {
    return (
        <LottieView
            ref={ref}
            source={{ uri: "https://lottie.host/31f03f8a-33b1-49e5-bff7-90d4db074cb6/ug1Gu8l31d.lottie" }}
            autoPlay={autoPlay}
            loop={loop}
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

export default LottieLuvu;
