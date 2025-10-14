import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const PrivacyScreenStyles = StyleSheet.create({
  dt_container: {
        flex: 1,
        padding: spacing.md,
        gap: ms(10)
    },
    dt_info_list_container: {
        backgroundColor: Colors.dt_border,
        borderRadius: ms(8),
        padding: ms(10),
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        elevation:ms(5),
        shadowColor:Colors.dt_white
    },
    dt_info_list_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(14),
        color: Colors.dt_white
    },
    dt_info_list_wrapper: {
        flexDirection: "row",
        gap: ms(5),
        maxWidth: "70%"
    },
    dt_info_list_icon:{
        width:ms(20),
        height:ms(20),
        alignItems:"center",
        justifyContent:"center",
    },
    dt_modal_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white
    },
})
