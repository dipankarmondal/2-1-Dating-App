import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const ProfileContentStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_profile_card_container:{
        width:"100%",
        padding:ms(10),
        backgroundColor:Colors.dt_gray + "33",
        borderRadius:ms(8)
    },
    dt_profile_header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    dt_profile_right_content:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10)
    },
    dt_profile_header_text:{
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "uppercase"
    },
    dt_edit_container:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5)
    },
    dt_edit_text:{
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_location_container:{
        flexDirection:"row",
        gap:ms(10),
        marginVertical:ms(15),
    },
    dt_profile_bio:{
        fontSize: ms(13),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        marginTop:ms(5)
    },
    dt_location_text:{
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        flexShrink:1
    },
    dt_image_container:{
        width:"100%",
        height:ms(250),
        borderRadius:ms(8),
        overflow:"hidden",
        marginBottom:ms(15)
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"stretch"
    },
     dt_profile_content: {
        flexDirection: "row",
        // justifyContent:"center",
        flexWrap: "wrap",
        gap: ms(5),
    },
    dt_button_two: {
        paddingHorizontal: ms(8),
        paddingVertical: ms(5),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + '33',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: ms(3),
        marginBottom: ms(5)
    },
    dt_button_text:{
        fontSize: ms(11),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_count_container:{
        width:ms(15),
        height:ms(15),
        backgroundColor:Colors.dt_card_blue,
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center"
    },
    container: {
        flex: 1,
        backgroundColor: Colors.dt_gray + '33',
        padding: 10,
        marginTop: ms(15),
        borderRadius: ms(8)
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingVertical: 8,
    },
    headerRow: {
        backgroundColor: Colors.dt_border,
        borderRadius:ms(8),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: ms(10),
    },
    cell: {
        flex: 1,
        color: "#fff",
        fontSize: ms(13),
        textAlign: "center",
        fontFamily:Fonts.Font_600
    },
    headerCell: {
        fontFamily:Fonts.Font_600,
        fontSize: 15,
    },
    label: {
        color: "#aaa",
    },
    dt_view_all_header_text:{
        fontSize:ms(17),
        fontFamily:Fonts.Font_700,
        color:Colors.dt_white
    },
    dt_view_all:{
        paddingHorizontal:ms(5),
        paddingVertical:ms(5)
    },
    dt_view_all_text:{
        fontSize:ms(14),
        fontFamily:Fonts.Font_700,
        color:Colors.dt_white
    }
})
