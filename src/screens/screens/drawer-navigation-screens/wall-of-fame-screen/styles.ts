import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const WallOfFameScreenStyles = StyleSheet.create({
    wall_of_fame_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white
    },
    slider: {
        width: '85%',
    },
    slider_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    location_container: {
        width: "85%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        top: ms(-10)
    },
    location_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white
    },
    slider_text:{
        fontSize:ms(13),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_white
    },
    wall_of_fame_content:{
        
    }
})
