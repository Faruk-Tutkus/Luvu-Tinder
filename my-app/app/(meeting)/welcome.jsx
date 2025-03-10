import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    FadeIn, FadeOut,
    BounceIn,
    SlideOutDown
} from 'react-native-reanimated';
import LottieWelcome from '../../component/lottieWelcome';
import LottieBackground from '../../component/lottieBackground';
import React from 'react'
import { router } from 'expo-router';
export default function Welcome() {
  return (
    <Animated.View style={styles.container} entering={FadeIn}>
        <Text style={styles.title}>
            Kaybolmuş gibisin
        </Text>
        <TouchableOpacity style={[styles.button]}
            onPress={()=> {
                router.navigate('/(meeting)/hello')
            }}
        >
            <View style={styles.buttonContainer}>
                <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "RMM" }}>
                Buralarda yeniyim
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}
            onPress={()=> {
                router.navigate('/(auth)/login')
            }}
        >
            <View style={styles.buttonContainer}>
                <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "RMM" }}>
                Zaten bir hesabım var
                </Text>
            </View>
        </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
        position:'relative'
    },
    button: {
        width: '70%',
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        marginVertical: 10,
        justifyContent: "center",
        backgroundColor: '#B7B1F2'
      },
      buttonContainer: {
        position:'relative', 
        alignItems:'center', 
        paddingHorizontal: 15,
      },
      title: {
        fontSize: 25,
        fontFamily: 'RMM',
        textAlign: 'center'
      }
})