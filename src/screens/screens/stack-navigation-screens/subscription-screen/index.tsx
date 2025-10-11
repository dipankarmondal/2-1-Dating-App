/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { SubscriptionScreenStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { ms } from '../../../../utils/helpers/responsive'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { features, restrictions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import SubmitButton from '../../../../components/submit-button'

/**Icons*/
import CheckIcon from '@svgs/check.svg'
import CrossIcon from '@svgs/cross.svg'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const SubscriptionScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Subscription"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_content_header}>
                        <Text style={styles.dt_content_header_text}>2+1 Premium Membership</Text>
                        <Text style={styles.dt_content_header_subtext}>Unlock all features and connect with like-minded individulas</Text>
                    </View>
                    <View style={styles.dt_subscription_info_card}>
                        <Text style={styles.dt_info_header_text}>Account is automatically renewed unless you disable recurring billing on the account page before the renewal date.</Text>
                        <View style={styles.dt_info_text_container}>
                            <Text style={styles.dt_info_text}>Your digital content has been made available to you with your explicit prior consent, and you have confirmed that you therefore waive your right of withdrawal.</Text>
                            <Text style={styles.dt_info_text}>The membership renewal fees will be based on the rates available at the time of renewal. If you renew, the new term will begin on the same day of renewal. 2+1 is not responsible for renewal charges if members fail to disable recurring billing. All sales are final, and no refunds will be issued.</Text>
                            <Text style={styles.dt_info_text}>To update your credit card details, please use this page to process your next payment. Charges will appear on your credit card statement as 2+1 Media Inc.</Text>
                            <Text style={styles.dt_info_text}>For any payment-related inquiries, please contact Member Support.</Text>
                        </View>
                    </View>
                    <View style={styles.dt_advantage_container}>
                        <Text style={styles.dt_advantage_header_text}>Your premium advantages</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[styles.dt_images_wrapper]}
                        >
                            {
                                features.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.dt_image_container}>
                                            <Text style={styles.dt_text_header}>{item?.category}</Text>
                                            <View style={{ gap: ms(5) }}>
                                                {
                                                    item?.items.map((item, index) => {
                                                        return (
                                                            <View key={index} style={styles.dt_image_text_container}>
                                                                <CheckIcon {...IconProps(ms(12))} fill={Colors.dt_success_green} />
                                                                <Text style={styles.dt_image_text}>{item}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.dt_advantage_container}>
                        <Text style={styles.dt_advantage_header_text}>Trial member features</Text>
                        <View style={styles.dt_subscription_info_card}>
                            {
                                restrictions.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.dt_image_text_container}>
                                            <CrossIcon {...IconProps(ms(16))} fill={Colors.dt_error} />
                                            <Text style={styles.dt_image_text}>{item?.text}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ gap: ms(8), marginVertical: ms(20) }}>
                        <Text style={styles.dt_image_text}>* Some features may be restricted based on other members’ privacy settings</Text>
                        <Text style={styles.dt_image_text}>** Some features may be restricted based on other members’ privacy settings</Text>
                    </View>
                    <SubmitButton
                        {...{
                            text: "See all plans",
                            loading: false,
                            onPress: () => { Navigation.navigate("SeePlans") }
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default SubscriptionScreen