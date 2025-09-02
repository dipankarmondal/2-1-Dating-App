/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { AuthLayoutStyles as styles } from './styles'
import { AuthProps } from '../../../utils/types/types'

/**Main export*/
const AuthLayout: React.FC<AuthProps> = ({ children, titile }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_content}>
                    <View style={styles.dt_content_box}>
                        <Text style={styles.dt_title}>{titile}</Text>
                        {children}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AuthLayout