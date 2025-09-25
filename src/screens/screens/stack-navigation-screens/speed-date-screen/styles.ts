import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const SpeedDateScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_content:{

    },
    dt_rules_text:{
        fontSize:ms(13),
        color:Colors.dt_white,
        fontFamily:Fonts.Font_500
    },
    dt_form_container:{
        marginTop:ms(20)
    }
})
