import { View, StyleSheet } from "react-native";
import LottieLoading from "../component/lottieLoading";
import { ThemeContext } from "../content/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Welcome from './(meeting)/welcome'
export default function Index() {
  const { colors } = useContext(ThemeContext);
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcome(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      {!welcome ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <LottieLoading />
        </Animated.View>
      ) : <Welcome />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF3B9",
    justifyContent: "center",
    alignItems: "center",
  },
});
