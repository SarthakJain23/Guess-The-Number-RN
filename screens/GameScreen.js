import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
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

const GameScreen = ({ userNumber, onGameOver, setRoundsNumber }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(minBoundary, maxBoundary, userNumber)
  );
  const [guessRounds, setGuessRounds] = useState([currentGuess]);

  const validateGuess = (increment) => {
    if (
      (increment && currentGuess >= userNumber) ||
      (!increment && currentGuess <= userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
  };

  const nextGuessHandler = (increment) => {
    if (validateGuess(increment)) {
      return;
    }
    if (increment) {
      minBoundary = currentGuess + 1;
    } else {
      maxBoundary = currentGuess - 1;
    }
    const newGuess = generateRandomBetween(minBoundary, maxBoundary);
    setRoundsNumber((prevRounds) => prevRounds + 1);
    setCurrentGuess(newGuess);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newGuess]);
    if (newGuess === userNumber) {
      onGameOver();
    }
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card title="Higher or Lower?" titleStyle={styles.titleStyle}>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(true)}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(false)}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>
        {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))}
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
  titleStyle: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
