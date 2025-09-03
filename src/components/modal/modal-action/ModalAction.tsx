/**React Imports */
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { ModalActionStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'

/**Icons*/
import CrossIcon from '@svgs/cross.svg'
import { ModalActionProps } from '../../../utils/types/types'
import { Colors } from '../../../utils/constant/Constant'
import { ms } from '../../../utils/helpers/responsive'

/**Main export*/
const ModalAction: React.FC<ModalActionProps> = ({ isModalVisible, setModalVisible, children, headerText, type }) => {
    return (
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.ml_modal_header}>
                                <Text style={styles.modalTitle}>{headerText}</Text>
                                <TouchableOpacity
                                    style={styles.ml_close_button}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <CrossIcon
                                        {...IconProps(ms(20))}
                                        fill={Colors.dt_bg}
                                    />
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                style={type !== "location" ? styles.ml_modal_body : undefined}
                                contentContainerStyle={{ paddingBottom: ms(20) }}
                                showsVerticalScrollIndicator={false}
                            >
                                {children}
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ModalAction