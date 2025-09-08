import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const FeedCardInfoHeaderStyles = StyleSheet.create({
    dt_container: {
        marginVertical: ms(10)
    },
    dt_title_text:{
        fontSize:ms(15),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white,
    },
    dt_date_text:{
        fontSize:ms(12),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_primary_green,
        marginTop:ms(5)
    }
})
