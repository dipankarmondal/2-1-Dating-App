import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const PartyEventCardStyles = StyleSheet.create({
    dt_user_info_card: {
        width: "100%",
        padding: ms(12),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
    },
    dt_image_container: {
        width: "100%",
        height: ms(220),
        borderRadius: ms(5),
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    dt_info_container: {
        marginTop: ms(10)
    },
    dt_name_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:ms(5)
    },
    dt_event_text: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "uppercase"
    },
    dt_name_text:{
        fontSize:ms(14),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_error
    },
    dt_group_creater:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white,
        marginVertical:ms(5)
    },
    dt_location_container:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5)
    },

})
