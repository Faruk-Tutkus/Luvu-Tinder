import { Text, View, StyleSheet, SafeAreaView, VirtualizedList } from "react-native";
import LottieLoading from "../component/lottieLoading"
import Home from "./home"
import { ThemeProvider, ThemeContext } from "../content/ThemeContext";
import { useContext } from "react";
import Hello from "./(meeting)/hello"
import { useEffect, useState } from "react";
import Color from '../content/colors'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  FadeIn, FadeOut,
  BounceIn,
  SlideOutDown
} from 'react-native-reanimated';
export default function Index() {
  const { colors } = useContext(ThemeContext);
  const [home, setHome] = useState(false)
  setTimeout(() => {
    setHome(true)
  }, 2500);
  return (
    <View style={[style.container, { backgroundColor: colors.bgColor }]}>
      {/* { home === false ? <Animated.View entering={FadeIn} exiting={FadeOut}> <LottieLoading /> </Animated.View> : <Home />} */}
      {<Hello/>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3B9',
    justifyContent: 'center',
    alignItems: 'center',
  }

})