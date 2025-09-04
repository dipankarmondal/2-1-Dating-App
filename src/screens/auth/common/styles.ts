import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms, spacing } from "../../../utils/helpers/responsive";

export const AuthLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dt_bg,
  },
  dt_content_box: {
    width: "100%",
    padding: spacing.md,
    backgroundColor: Colors.dt_border,
    borderRadius: ms(20)
  },
  dt_title: {
    fontSize: ms(20),
    color: Colors.dt_white,
    textAlign: "center",
    fontFamily: Fonts.Font_600,
    // marginBottom:ms(20),
  },
  dt_subtext:{
    fontSize: ms(13),
    color: Colors.dt_white,
    alignSelf:"flex-start",
    fontFamily: Fonts.Font_600,
    marginTop:ms(15),
  },
  dt_content: {
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dt_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dt_logout: {
    width: ms(35),
    height: ms(35),
    borderRadius: ms(50),
    backgroundColor: Colors.dt_gray + "33",
    alignItems: "center",
    justifyContent: "center"
  },
  dt_back: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: ms(10),
    backgroundColor:Colors.dt_gray + "33",
    alignSelf:"center",
    paddingHorizontal:ms(5),
    paddingVertical:ms(5),
    borderRadius:ms(50)
  },
  dt_back_text: {
    fontFamily: Fonts.Font_600,
    fontSize: ms(14),
    color: Colors.dt_white,
    marginLeft: ms(5),
    marginTop: ms(-4)

  }
})
