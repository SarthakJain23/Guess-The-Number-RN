import { Dimensions, StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/colors";

const Card = ({ children, title, titleStyle }) => {
  return (
    <View style={styles.cardStyle}>
      {title && <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>}
      {children}
    </View>
  );
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primary800,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  cardTitle: {
    fontFamily: "open-sans",
    color: COLORS.accent500,
    fontSize: 24,
  },
});
