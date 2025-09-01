/**React Imports */
import { View, Image, StatusBar } from 'react-native'
import React from 'react'

/**Local imports*/
import { SplashStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { LoaderKitView } from 'react-native-loader-kit';

/**Main export*/
const Splash: React.FC = () => {
    return (
        <View style={styles.wm_container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.dt_bg} />
            <View style={styles.wn_logo_container}>
                <Image source={require("@images/logo.png")} style={styles.wn_logo} />
            </View>
            <LoaderKitView
                style={{ width: 22, height: 22 }}
                name={'BallBeat'}
                animationSpeedMultiplier={1.0}
                color={Colors.dt_white}
            />
        </View>
    )
}

export default Splash