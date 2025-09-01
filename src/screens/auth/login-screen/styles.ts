import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const LoginScreenStyles = StyleSheet.create({
  dt_content_container: {
    alignItems: "center",
  },
  dt_content_text: {
    fontSize: ms(18),
    color: Colors.dt_white,
    textAlign: "center",
    fontFamily: Fonts.Font_600,
  },
  dt_content_subtext: {
    fontSize: ms(16),
    color: Colors.dt_white,
    textAlign: "center",
    fontFamily: Fonts.Font_600,
  },
  forgot_password_container: {
    marginVertical: ms(10)
  },
  forgot_password: {
    fontSize: ms(16),
    color: Colors.dt_white,
    textAlign: "center",
    fontFamily: Fonts.Font_600,
    textDecorationColor: Colors.dt_white,
    textDecorationLine: "underline",
    textDecorationStyle: "solid"
  },
  register_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:ms(15)
  },
  register_text: {
    fontFamily: Fonts.Font_600,
    fontSize: ms(16),
    color: Colors.dt_white
  },  
  register_button: {
    borderRadius:ms(50),
    paddingVertical:ms(5),
    paddingHorizontal:ms(10),
    borderWidth:1,
    borderColor:Colors.dt_white,
    alignItems:"center",
    justifyContent:"center"
  },
  register_button_text: {
    fontFamily: Fonts.Font_600,
    fontSize: ms(16),
    color: Colors.dt_white
  },
})
