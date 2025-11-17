import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const LiveStreamStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
    },
    dt_stream_screen: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: ms(8)
    },
    dt_live_stream_screen: {
        flexGrow: 1,
        width: "100%",
        height: "100%",
        borderRadius: ms(10),
        backgroundColor: Colors.dt_gray
    },
    dt_stream_footer: {
        height: 60,
        width: "100%",
        // backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: ms(10),  
        paddingHorizontal:ms(10) 
    },
    dt_input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: ms(100),
        minHeight: ms(42),
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        // marginHorizontal: ms(8)
    },
    dt_sendButton: {
        backgroundColor: Colors.dt_gray + "33",
        width: ms(40),
        height: ms(40),
        borderRadius: ms(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
})
