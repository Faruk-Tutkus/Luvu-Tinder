import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import LottieGoogle from "@/component/lottieGoogle";
import LottieFacebook from "@/component/lottieFacebook";
import LottieApple from "@/component/lottieApple";
import { useEffect, useContext } from "react";
import { ThemeProvider, ThemeContext } from "../../content/ThemeContext";
import { router } from "expo-router";
export default function Login() {


  const { colors } = useContext(ThemeContext);

  const fields = ["email", "password"];
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
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <Text style={{textAlign: 'center', fontFamily: 'RML', fontSize: 25, marginBottom: 10}}>Tekrar Hoşgeldin</Text>
      {fields.map((key, index) => (
        <Animated.View key={index} style={styles.inputBar}>
          <Animated.Text style={[styles.text, animatedStyles[key]]}>
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
      <TouchableOpacity style={styles.button}
        onPress={()=> {
          router.navigate('/(tabs)')
        }}
      >
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, fontFamily: "RMM" }}>
            Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 20, textDecorationLine: 'underline', fontFamily: 'RMB', marginBottom: 50}}>
        Şifremi Unuttum
      </Text>
      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
          <LottieGoogle />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM" }}>
            Google İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
          <LottieFacebook />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM" }}>
            Facebook İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
        <LottieApple />
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "RMM" }}>
            Apple İle Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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