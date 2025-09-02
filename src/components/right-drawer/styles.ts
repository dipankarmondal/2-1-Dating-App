import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";
const { width } = Dimensions.get("window");

export const RightDrawerStyles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    drawer: {
        position: "absolute",
        right: 0,
        width: width * 0.55,
        height: "100%",
        backgroundColor: Colors.dt_border,
    },
    dt_settings_content:{
        top:ms(55),
        gap:ms(18),
        padding:ms(16),
        paddingBottom:ms(70)
    },
    dt_settings_item:{
        flexDirection:"row",
        alignItems:"center",
    },
    dt_settings_text:{
        color:Colors.dt_white,
        fontSize:ms(16),
        marginLeft:ms(8),
        fontFamily:Fonts.Font_600
    },
    backdrop:{
        flex:1
    }
});