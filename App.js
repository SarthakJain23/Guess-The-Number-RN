import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import GameStartScreen from "./screens/GameStartScreen";

export default function App() {
  const [roundsNumber, setRoundsNumber] = useState(0);
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (loaded) {
      setAppIsReady(true);
    }
  }, [loaded]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const gameOverHandler = (numberOfRounds) => {
    setRoundsNumber(numberOfRounds);
    setGameIsOver(true);
  };

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const onStartNewGame = () => {
    setUserNumber(null);
    setRoundsNumber(0);
  };

  const renderScreen = () => {
    if (gameIsOver && userNumber) {
      return (
        <GameOverScreen
          roundsNumber={roundsNumber}
          userNumber={userNumber}
          onStartNewGame={onStartNewGame}
        />
      );
    }
    if (userNumber) {
      return (
        <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
      );
    }
    return <GameStartScreen onPickNumber={pickedNumberHandler} />;
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[COLORS.primary700, COLORS.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView edges={["top"]} style={styles.rootScreen}>
            {renderScreen()}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
