/**React Imports */
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { ModalActionStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ModalActionProps } from '../../../utils/types/types'
import { Colors } from '../../../utils/constant/Constant'
import { ms } from '../../../utils/helpers/responsive'

/**Icons*/
import CrossIcon from '@svgs/cross.svg'
import ShareIcon from '@svgs/share.svg'

/**Main export*/
const ModalAction: React.FC<ModalActionProps> = ({ isModalVisible, setModalVisible, children, headerText, type, onShare }) => {
    return (
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                {
                    type === "message" && (
                        <TouchableOpacity style={styles.ml_messahe_close_button} onPress={() => setModalVisible(false)}>
                            <CrossIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    )
                }
                <View style={styles.modalContainer}>
                    {
                        type !== "message" && (
                            <View style={styles.ml_modal_header}>
                                <View style={styles.ml_title_container}>
                                    <Text style={styles.modalTitle}>{headerText}</Text>
                                    {
                                        type === "notification" && (
                                            <TouchableOpacity style={styles.dt_icon_box} onPress={onShare}>
                                                <ShareIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                                <TouchableOpacity
                                    style={styles.ml_close_button}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <CrossIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <ScrollView
                        contentContainerStyle={{ padding: ms(16), flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAction