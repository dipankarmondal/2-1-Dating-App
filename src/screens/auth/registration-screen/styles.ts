import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const RegistrationScreenStyles = StyleSheet.create({
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
