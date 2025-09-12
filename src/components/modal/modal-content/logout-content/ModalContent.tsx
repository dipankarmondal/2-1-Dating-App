import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LogoutContentStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { ModalContentProps } from '../../../../utils/types/types'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'

const ModalContent: React.FC<ModalContentProps> = ({setModal,title,successText,cancelText,onSuccess}) => {
    const { logout } = useAuth();

    const handleCancel = () => {
        setModal(false)
    }

    return (
        <View>
            <Text style={styles.dt_logout_text}>
                {title}
            </Text>
            <View style={styles.dt_button_container}>
                <TouchableOpacity
                    style={styles.dt_cancel_button}
                    onPress={handleCancel}
                >
                    <Text style={[styles.dt_btn_text, { color: Colors.dt_black }]}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.dt_logout_confirm_button}
                    onPress={onSuccess}
                >
                    <Text style={[styles.dt_btn_text, { color: Colors.dt_white }]}>{successText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalContent