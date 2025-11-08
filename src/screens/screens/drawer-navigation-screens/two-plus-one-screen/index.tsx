/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { TwoPlusOneScreenStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'

/**Icons*/
import InviteFriends from "@svgs/setting/invite.svg";
import CoinIcon from "@svgs/coins.svg";
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const TwoPlusOneScreen = () => {
    const Navigation = useNavigation<any>()
    const Data = [
        {
            icon: InviteFriends,
            btnText: "Invite Friends",
            onClick: () => {Navigation.navigate("InviteFriendsScreen")}, 
            label: "Grow your network by inviting friends to join 2+1! Share your unique QR code, invitation text, or send email invites to enhance your lifestyle journey together. "
        },
        // {
        //     icon: CoinIcon,
        //     btnText: "2+1 Partner",
        //     onClick: () => { },
        //     label: "Make money and grow your business with 2+1 - all with the flexibility of one Partner Account. Participate as an affiliate, an advertiser, or both! Learn more about how to grow your brand and earn 50% affiliate commissions."
        // },
    ]
    return (
        <ScreenLayout>
            <ScrollView style={{ flex: 1 }}>
                <View style={CommonStyles.dt_container}>
                    {
                        Data.map((item, index) => {
                            const Icon = item?.icon
                            return (
                                <View key={index} style={styles.dt_user_info_card}>
                                    <View style={styles.dt_icon_container}>
                                        <Icon {...IconProps(ms(35))} fill="#ec5252" />
                                    </View>
                                    <TouchableOpacity style={styles.dt_btn_box} onPress={item?.onClick}>
                                        <Text style={styles.dt_btn_text}>{item?.btnText}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.dt_decription}>{item?.label}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default TwoPlusOneScreen
