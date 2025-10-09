import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const InviteFriendsScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md,
        gap: ms(16)
    },
    dt_header_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
        color: Colors.dt_white,
        marginBottom: ms(10)
    },
    dt_user_info_card: {
        width: "100%",
        padding: ms(15),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
        alignItems: "center",
        gap: ms(15)
    },
    dt_user_info_text:{
        fontFamily:Fonts.Font_500,
        fontSize:ms(12),
        color:Colors.dt_white
    },
    dt_image_container:{
        width:ms(100),
        height:ms(100),
        borderRadius:ms(8),
        overflow:"hidden"
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
    }
})
