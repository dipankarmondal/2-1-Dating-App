import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { LiveStreamStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import SendIcon from '@svgs/send.svg'

type Props = {
    route: any
}

const LiveStreamScreen: React.FC<Props> = ({ route }) => {
    const { userId } = route.params


    return (
        <ScreenLayout
            {...{
                type: "stream",
            }}
        >
            <View style={styles.dt_container}>
                <View style={styles.dt_stream_screen}>
                    <View style={styles.dt_live_stream_screen}>

                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={80}
                >
                    <View style={styles.dt_stream_footer}>
                        <TextInput
                            style={styles.dt_input}
                            placeholder="Type a message..."
                            placeholderTextColor={Colors.dt_gray}
                            multiline
                            scrollEnabled
                        />
                        <TouchableOpacity style={styles.dt_sendButton}>
                            <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </ScreenLayout>
    )
}

export default LiveStreamScreen