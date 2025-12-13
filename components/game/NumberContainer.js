import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/colors.js";

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: COLORS.accent500,
    padding: 24,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  numberText: {
    color: COLORS.accent500,
    fontSize: 36,
    fontWeight: "bold",
  },
});
