import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useContext } from "react";
import { ThemeProvider, ThemeContext } from "../content/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Love': require('../assets/fonts/Love.ttf'),
    'RMB': require('../assets/fonts/RMB.ttf'),
    'RML': require('../assets/fonts/RML.ttf'),
    'RMM': require('../assets/fonts/RMM.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  )
}

function RootLayoutContent() {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          statusBarBackgroundColor: colors.bgColor, 
          navigationBarColor: colors.bgColor, 
          animation: 'slide_from_right',
          animationDuration: 1
        }} 
      />
    </Stack>
  );
}