import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const PrivatePartyScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_rules_text: {
        fontSize: ms(13),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_500
    },
    dt_form_container:{
        marginTop:ms(20)
    },
    dt_download_row:{ 
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%" 
    }
})
