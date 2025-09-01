/** React Imports */
import React, { useState } from 'react'
import { DevSettings, StatusBar } from 'react-native'
import { View, Text, ActivityIndicator, Pressable } from 'react-native'

/** Local Imports */
import { ConnectionStyles as styles } from './styles'

/** Local Imports */
import { Colors } from '../../utils/constant/Constant'

/** Liabary*/
import LottieView from 'lottie-react-native';

const NetworkNotConnect = () => {
    const [loading, setLoading] = useState(false);

    const handleReload = () => {
        setLoading(true);
        setTimeout(() => {
            DevSettings.reload();
        }, 1000);
    };

    return (
        <>
            <View style={styles.seofline_container}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.dt_bg} />
                <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.seinternet_box}>
                        <LottieView
                            source={require('../../../assets/animations/connection.json')}
                            autoPlay
                            loop
                            style={{ width: "100%", height: "100%", }}
                        />
                    </View>
                    <View style={styles.se_header_container}>
                        <Text style={styles.se_header}>Wifi and Mobile data disabled!</Text>
                        <Text style={styles.se_sub_header}>
                            Seems like your Wifi and Mobile data are turned off. Please enable internet and try again
                        </Text>
                    </View>
                </View>
                <Pressable style={styles.se_reload} onPress={handleReload} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color={Colors.dt_black} />
                    ) : (
                        <Text style={styles.se_retry}>Reload</Text>
                    )}
                </Pressable>
            </View>
        </>
    )
}

export default NetworkNotConnect