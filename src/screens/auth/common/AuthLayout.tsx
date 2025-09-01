import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { AuthLayoutStyles as styles } from './styles'

type AuthProps = {
    children: React.ReactNode,
    titile: string
}

const AuthLayout: React.FC<AuthProps> = ({ children,titile }) => {
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