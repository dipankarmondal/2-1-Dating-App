import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms, spacing } from "../../../utils/helpers/responsive";

export const AuthLayoutStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.dt_bg,
  },
  dt_content_box:{
    width:"100%",
    padding:spacing.md,
    backgroundColor:Colors.dt_border,
    borderRadius:ms(20)
  },
  dt_title:{
    fontSize:ms(20),
    color:Colors.dt_white,
    textAlign:"center",
    fontFamily:Fonts.Font_600,
    // marginBottom:ms(20),
  },
  dt_content:{
    padding:spacing.md,
    alignItems:"center",
    justifyContent:"center",
    flex:1,
  },
  dt_header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  dt_logout:{
    width:ms(35),
    height:ms(35),
    borderRadius:ms(50),
    backgroundColor:Colors.dt_gray + "33",
    alignItems:"center",
    justifyContent:"center"
  }
})
