import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "../../../../utils/helpers/responsive";

export const FriendsStyles = StyleSheet.create({
  dt_friend_btn: {
    paddingVertical: ms(5),
  },
  dt_friend_btn_text: {
    fontFamily: Fonts.Font_600,
    fontSize: ms(16),
    color: Colors.dt_white
  },
  dt_input_container: {
    width: "100%",
    minHeight: ms(50),
    maxHeight: ms(60),
    borderRadius: ms(100),
    borderWidth: ms(1),
    borderColor: Colors.dt_white,
    overflow: "hidden",
    paddingLeft: ms(10),
    paddingRight: ms(5),
    flexDirection: "row",
    alignItems: "flex-start", // changed to align top for multiline
  },

  dt_input: {
    flex: 1,
    minHeight: ms(48),
    maxHeight: ms(200),
    color: Colors.dt_white,
  },

  dt_sendButton: {
    marginLeft: ms(5),
    backgroundColor: Colors.dt_gray + "33",
    width: ms(40),
    height: ms(40),
    borderRadius: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
    marginBottom: ms(4)
  },
})
