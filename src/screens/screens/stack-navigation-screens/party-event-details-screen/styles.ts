import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const PartyEventDetailsScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_header_container: {
        marginVertical: ms(5),
        marginBottom: ms(10)
    },
    dt_header_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(20),
        color: Colors.dt_white
    },
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
        marginVertical: ms(5)
    },
    dt_event_text: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "uppercase"
    },
    dt_name_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_error
    },
    dt_location_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5)
    },
    dt_inner_header_text: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_inner_sub_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_gray
    },
    dt_action_overlay: {
        position: "absolute",
        top: ms(10),
        right: ms(10),
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
        width: ms(30),
        height: ms(30),
        borderRadius: ms(50),
    },
    dt_action_container:{
        alignSelf:"flex-start",
        paddingVertical:ms(5),
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10)
    },
    dt_action_text:{
        fontSize:ms(15),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white
    },
    dt_organize_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:Colors.dt_primary_green,
        borderRadius:ms(8),
        padding:ms(10),
        height:ms(55),
        marginVertical:ms(16)
    },
    dt_organize_title:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_black
    },
    dt_organize_info:{

    },
    dt_organize_info_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    dt_inner:{

    },
    dt_inner_container:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5),
        marginTop:ms(5)
    },
    dt_inner_approval_text:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_coin_yellow
    },
    dt_organize_buttons:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    dt_button:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:ms(5),
        borderWidth:ms(1),
        borderColor:Colors.dt_card_blue,
        borderRadius:ms(50),
        paddingHorizontal:ms(10),
        paddingVertical:ms(8),
        width:"48%",
        marginTop:ms(20)
    },
    dt_button_text:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_card_blue
    },
    dt_line:{
        width:"100%",
        height:ms(.5),
        backgroundColor:Colors.dt_white,
        marginVertical:ms(15),
        marginTop:ms(20)
    }
})
