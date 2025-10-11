import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SubscriptionScreenStyles as styles } from '../styles'
import ScreenLayout from '../../../common/ScreenLayout'
import { ms } from '../../../../../utils/helpers/responsive'

const SeePlans: React.FC = () => {
    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "All Plans",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_content_header}>
                        <Text style={styles.dt_content_header_text}>Subscription plan</Text>
                        <Text style={styles.dt_content_header_subtext}>Simple, transparent pricing</Text>
                    </View>
                    <View style={styles.dt_subscription_info_card}>
                        <Text style={styles.dt_plan_header_text}>1 Month Premium</Text>
                        <Text style={[styles.dt_content_header_subtext,{textAlign:"left", marginTop:ms(-5)}]}>
                            Lorem ipsum dolor sit amet.
                        </Text>
                        <View style={styles.dt_price_container}>
                            <Text style={styles.dt_price_text}>₹ 2407</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default SeePlans