import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import LottieGoogle from "@/component/lottieGoogle";
import LottieFacebook from "@/component/lottieFacebook";
import LottieApple from "@/component/lottieApple";
import { useEffect, useContext } from "react";
import { ThemeProvider, ThemeContext } from "../../content/ThemeContext";
import Color from "@/content/colors";
export default function Register() {

  const { colors } = useContext(ThemeContext);

  const fields = ["name", "email", "password", "rePassword"];

  const [textValues, setTextValues] = useState(
    fields.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const offsets = fields.reduce((acc, key) => {
    acc[key] = useSharedValue(0);
    return acc;
  }, {});

  const animatedStyles = fields.reduce((acc, key) => {
    acc[key] = useAnimatedStyle(() => ({
      transform: [{ translateY: offsets[key].value }],
    }));
    return acc;
  }, {});

  const handleFocus = (key, isFocused) => {
    if (isFocused || textValues[key] !== "") {
      offsets[key].value = withSpring(-35, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      offsets[key].value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    }
  };
  const handleChangeText = (key, value) => {
    setTextValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container, { backgroundColor: colors.bgColor }]}>
        <Text style={{textAlign: 'center', fontFamily: 'RML', fontSize: 25, marginBottom: 10, color: colors.tColor}}>Bize Katıl</Text>
      {fields.map((key, index) => (
        <Animated.View key={index} style={[styles.inputBar, { backgroundColor: '#ADB2D4' }]}>
          <Animated.Text style={[styles.text, animatedStyles[key], { color: colors.btColor }]}>
            {key === "name"
              ? "Kullanıcı Adı"
              : key === "email"
              ? "E-Posta"
              : key === "password"
              ? "Şifre"
              : "Şifre - Tekrar"}
          </Animated.Text>
          <TextInput
            style={styles.input}
            onFocus={() => handleFocus(key, true)}
            onBlur={() => handleFocus(key, false)}
            onChangeText={(value) => handleChangeText(key, value)}
            value={textValues[key]}
          />
        </Animated.View>
      ))}
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.bColor }]}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, fontFamily: "RMM", color: colors.btColor }}>
            Kayıt Ol
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.bColor }]}>
        <View style={styles.buttonContainer}>
          <LottieGoogle />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM", color: colors.btColor }}>
            Google İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.bColor }]}>
        <View style={styles.buttonContainer}>
          <LottieFacebook />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM", color: colors.btColor }}>
            Facebook İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.bColor }]}>
        <View style={styles.buttonContainer}>
        <LottieApple />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM", color: colors.btColor }}>
            Apple İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'center',
    paddingVertical: 15,
  },
  inputBar: {
    width: "85%",
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 20,
    backgroundColor: '#FDB7EA'
  },
  text: {
    position: "absolute",
    left: 15,
    fontFamily: "RMM",
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    height: "100%",
    width: "100%",
  },
  button: {
    width: "75%",
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    justifyContent: "center",
    backgroundColor: '#B7B1F2'
  },
  buttonContainer: {
    flexDirection: 'row',
    position:'relative', 
    alignItems:'center', 
    paddingHorizontal: 15,
  }
});