import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const VideoModalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.dt_black, // semi-transparent backdrop
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    videoContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: ms(12),
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay:{
        position: "absolute",
        top: ms(20), right:ms(20),
        backgroundColor: Colors.dt_white,
        width:ms(30),
        height:ms(30),
        borderRadius:ms(50),
        zIndex:10000,
        alignItems:"center",
        justifyContent:"center"
    }
})
