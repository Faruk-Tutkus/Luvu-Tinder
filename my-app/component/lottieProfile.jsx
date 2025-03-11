import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieProfile = ({loop, autoPlay,ref}) => {
    return (
        <LottieView
            ref={ref}
            source={{ uri: "https://lottie.host/5e0f6af8-4d19-4d85-81be-d64c0da715b8/7p1wuSs65C.lottie" }}
            loop={loop}
            autoPlay={autoPlay}
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

export default LottieProfile;
