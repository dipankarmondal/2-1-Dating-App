import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";

export const CommonStyles = StyleSheet.create({
  dt_container: {
    padding: spacing.md,
    paddingBottom:ms(150)
  },
  dt_overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: ms(-200),
    width:ms(30),
    height:ms(30),
    borderRadius: ms(50),
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  }
})
