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
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.ml_modal_header}>
                        <Text style={styles.modalTitle}>{headerText}</Text>
                        <TouchableOpacity
                            style={styles.ml_close_button}
                            onPress={() => setModalVisible(false)}
                        >
                            <CrossIcon {...IconProps(ms(20))} fill={Colors.dt_bg} />
                        </TouchableOpacity>
                    </View>

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