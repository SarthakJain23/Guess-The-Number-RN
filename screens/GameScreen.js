import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const nextGuessHandler = (increment) => {
    if (
      (increment && currentGuess >= userNumber) ||
      (!increment && currentGuess <= userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (increment) {
      minBoundary = currentGuess + 1;
    } else {
      maxBoundary = currentGuess - 1;
    }
    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      userNumber
    );
    setCurrentGuess(newGuess);
    if (newGuess === userNumber) {
      onGameOver();
    }
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={() => nextGuessHandler(true)}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler(false)}>
            -
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Text>Your Guess</Text>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
});
