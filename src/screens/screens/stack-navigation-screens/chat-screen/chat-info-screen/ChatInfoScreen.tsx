/**React Imports */
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ChatScreenStyles as styles } from '../styles'
import { CommonStyles as CommonStyles } from '../../../common/CommonStyle'
import { IconProps } from '../../../../../utils/helpers/Iconprops'
import { ms } from '../../../../../utils/helpers/responsive'
import { Colors } from '../../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../../common/ScreenLayout'
import ModalAction from '../../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../../components/modal/modal-content/logout-content/ModalContent'

/**Icons*/
import MuteIcon from '@svgs/mute.svg'
import LeaveIcon from '@svgs/user-logout.svg'
import LocationIcon from '@svgs/location.svg'

type Props = {
    route: any
}

const ChatInfoScreen: React.FC<Props> = ({ route }) => {
    const { chat, type } = route.params || {}
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: chat?.name ?? "Chat Info",
                ...(type === "group" && {
                    headerChildren: (
                        <View style={styles.dt_menu_wrapper}>
                            <TouchableOpacity style={styles.dt_menu_container}>
                                <MuteIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dt_menu_container} onPress={() => setShowLeaveModal(true)}>
                                <LeaveIcon {...IconProps(ms(16))} fill={Colors.dt_error} />
                            </TouchableOpacity>
                        </View>
                    ),
                })
            }}
        >
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={CommonStyles.dt_container}>
                    <Text style={styles.dt_admin_text}>Admin</Text>
                    <TouchableOpacity
                        style={styles.dt_messenger_wrapper}
                        activeOpacity={0.7}
                    >
                        <View style={styles.dt_image_container}>
                            <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                        </View>
                        <View style={styles.dt_text_container}>
                            <View style={styles.dt_name_wrapper}>
                                <Text style={styles.dt_name}>ONENOGHTLOVE</Text>
                            </View>
                            <View style={styles.dt_location_wrapper}>
                                <LocationIcon {...IconProps(ms(11))} fill={Colors.dt_gray} />
                                <Text style={styles.dt_text}>Hyderabad, IND</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dt_line} />
                    <Text style={styles.dt_admin_text}>Members(20)</Text>
                    <View style={{ gap: ms(16) }}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dt_messenger_wrapper}
                                activeOpacity={0.7}
                            >
                                <View style={styles.dt_image_container}>
                                    <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                                </View>
                                <View style={styles.dt_text_container}>
                                    <View style={styles.dt_name_wrapper}>
                                        <Text style={styles.dt_name}>ONENOGHTLOVE {index + 1}</Text>
                                    </View>
                                    <View style={styles.dt_location_wrapper}>
                                        <LocationIcon {...IconProps(ms(11))} fill={Colors.dt_gray} />
                                        <Text style={styles.dt_text}>Hyderabad, IND</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showLeaveModal}
                setModalVisible={setShowLeaveModal}
                headerText="Delete Chat"
            >
                <ModalContent
                    {...{
                        setModal: setShowLeaveModal,
                        title: `Do you want to leave this group?`,
                        successText: "Yes, Leave Group",
                        cancelText: "No, Stay",
                        onSuccess: () => {
                            setShowLeaveModal(false);
                        }
                    }}
                />
            </ModalAction>
        </ScreenLayout >
    )
}

export default ChatInfoScreen