import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const BugReportScreenStyles = StyleSheet.create({
    dt_content_header_text: {
        fontSize: ms(20),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
    },
    dt_content_header_subtext: {
        fontSize: ms(13),
        color: Colors.dt_gray,
        fontFamily: Fonts.Font_600,
        marginTop:ms(8) 
    }
})
