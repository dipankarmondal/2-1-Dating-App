import { View, Text, ScrollView, Image, Share } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { InviteFriendsScreenStyles as styles } from './styles'
import SubmitButton from '../../../../components/submit-button'

const InviteFriendsScreen: React.FC = () => {

    const Data = [
        {
            image: require('@images/qr_code.png'),
            description: "Share the image of your personalized QR code below to invite your friends to join you on 2+1. Share it with your friends in person and on communication platforms like WhatsApp, Messenger, etc.",
        },
        {
            image: require('@images/logo.png'),
            description: "Share 2+1 with your friends on communication platforms like WhatsApp, Messenger, etc.",
        },
    ]

    const handleShare = async (description: string) => {
        try {
            await Share.share({
                message: description, // you can also include URL if needed
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Invite Friends"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <Text style={styles.dt_header_text}>
                        Grow your network by inviting friends to join 2+1! Share your unique QR code, invitation text, or send email invites to enhance your lifestyle journey together.
                    </Text>
                    {
                        Data.map((item, index) => {
                            return (
                                <View key={index} style={styles.dt_user_info_card}>
                                    <Text style={styles.dt_user_info_text}>{item?.description}</Text>
                                    <View style={styles.dt_image_container}>
                                        <Image source={item?.image}
                                            style={styles.dt_image}
                                        />
                                    </View>
                                    <SubmitButton
                                        {...{
                                            text: "Share",
                                            loading: false,
                                            onPress: () => handleShare(item.description),
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default InviteFriendsScreen

