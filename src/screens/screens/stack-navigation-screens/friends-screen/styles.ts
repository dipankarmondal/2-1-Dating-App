import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "../../../../utils/helpers/responsive";

export const FriendsStyles = StyleSheet.create({
  dt_friend_btn:{
    paddingVertical:ms(5),
    // backgroundColor:"red"
  },
  dt_friend_btn_text:{
    fontFamily:Fonts.Font_600,
    fontSize:ms(16),
    color:Colors.dt_white
  }
})
