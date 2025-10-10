import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const CreateAlbumContentStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
    },
    dt_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        textAlign:"center",
    },
    dt_input_container:{
        flex:1,
        marginVertical:ms(15)
    }
})
