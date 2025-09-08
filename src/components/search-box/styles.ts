import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";
export const SearchBoxStyles = StyleSheet.create({
  dt_search_box_container: {
    width: "85%",
    height: ms(47),
    borderRadius: ms(100),
    backgroundColor: Colors.dt_white,
    elevation: 5,
    shadowColor: Colors.dt_black,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(10)
  },
  dt_search_input: {
    flex: 1,
    fontSize: ms(16),
    marginLeft: ms(5),
    color: Colors.dt_black,
    fontFamily: Fonts.Font_600,
  },
  dt_cross_container: {
    width: ms(22),
    height: ms(22),
    backgroundColor: Colors.dt_bg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ms(50),
    elevation: 3,
    shadowColor: Colors.dt_black
  },
  dt_search_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  dt_filter_container: {
    height: ms(44),
    width: ms(44),
    borderRadius: ms(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dt_white,
    elevation: 5,
    shadowColor: Colors.dt_black
  },
  suggestionBox: {
    backgroundColor: "#fff",
    borderRadius: ms(8),
    marginTop: ms(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    position: "absolute",
    top: ms(55),
    left: 0,
    zIndex: 1000,
    width: "85%",
    maxHeight: ms(300),
    overflow: "hidden",
  },
  suggestionItem: {
    paddingVertical: ms(10),
    paddingHorizontal: ms(16),
  },
  suggestionText: {
    fontSize: ms(16),
    color: Colors.dt_black,
    fontFamily: Fonts.Font_600

  },
})
