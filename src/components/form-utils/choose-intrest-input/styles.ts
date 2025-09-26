import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = 4;

export const ChooseIntrestInputStyles = StyleSheet.create({
  container: {
    marginBottom: ms(15),
  },
  label: {
     color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    flex: 1, // evenly spread
    maxWidth: (width - ITEM_MARGIN * 8) / 4, // 4 items per row (change if dynamic)
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: ITEM_MARGIN,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: Colors.dt_border,
  },
  optionSelected: {
    borderColor: "green",
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  image: {
    width: 35,
    height: 35,
    marginBottom: 5,
    resizeMode: "contain",
  },
  optionText: {
    color: Colors.dt_white,
    textAlign: "center",
    fontSize: ms(11),
    fontFamily: Fonts.Font_500
  },
  optionTextSelected: {
    color: "green",
  },
});