import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import GuessLogItem from "../components//game/GuessLogItem";
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

const GameScreen = ({ userNumber, onGameOver }) => {
  const {} = useWindowDimensions();
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(minBoundary, maxBoundary, userNumber),
  );
  const [guessRounds, setGuessRounds] = useState([currentGuess]);

  const isValid = (increment) => {
    if (
      (increment && currentGuess >= userNumber) ||
      (!increment && currentGuess <= userNumber)
    ) {
      return false;
    }
    return true;
  };

  const nextGuessHandler = (increment) => {
    if (!isValid(increment)) {
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
    const newGuess = generateRandomBetween(minBoundary, maxBoundary);
    setCurrentGuess(newGuess);
    setGuessRounds((prevGuessRounds) => [newGuess, ...prevGuessRounds]);
    if (newGuess === userNumber) {
      minBoundary = 1;
      maxBoundary = 100;
      onGameOver(guessRounds.length + 1);
    }
  };

  const getContentScreen = () => {
    const numberContainer = <NumberContainer>{currentGuess}</NumberContainer>;
    const cardContainer = (children) => (
      <Card title="Higher or Lower?" titleStyle={styles.titleStyle}>
        {children}
      </Card>
    );
    const getButtons = (children) => (
      <>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler(true)}>
            <Ionicons name="add" size={24} color="white" />
          </PrimaryButton>
        </View>
        {children}
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler(false)}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
        </View>
      </>
    );
    if (width < 500) {
      return (
        <>
          {numberContainer}
          {cardContainer(
            <View style={styles.buttonsContainer}>{getButtons()}</View>,
          )}
        </>
      );
    }

    return cardContainer(
      <View style={styles.buttonsContainerWide}>
        {getButtons(numberContainer)}
      </View>,
    );
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {getContentScreen()}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  titleStyle: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
