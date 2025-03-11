import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieComment = ({loop, autoPlay, ref}) => {
    return (
        <LottieView
            ref={ref}
            source={{ uri: "https://lottie.host/327d6f02-9d1a-45a1-bcb2-fcbbd773e15e/ZMO7wDoSlh.lottie" }}
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

export default LottieComment;
