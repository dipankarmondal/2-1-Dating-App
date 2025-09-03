import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LogoutContentStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { LogoutContentProps } from '../../../../utils/types/types'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'

const LogoutContent: React.FC<LogoutContentProps> = ({setShowDropdown}) => {
    const { logout } = useAuth();

    const handleCancel = () => {
        setShowDropdown(false)
    }
    const handleLogoutConfirm = () => {
        logout()
        setShowDropdown(false)
    }
    return (
        <View>
            <Text style={styles.dt_logout_text}>
                Do you want to log out from your account?
            </Text>
            <View style={styles.dt_button_container}>
                <TouchableOpacity
                    style={styles.dt_cancel_button}
                    onPress={handleCancel}
                >
                    <Text style={[styles.dt_btn_text, { color: Colors.dt_black }]}>No, Stay Logged In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.dt_logout_confirm_button}
                    onPress={handleLogoutConfirm}
                >
                    <Text style={[styles.dt_btn_text, { color: Colors.dt_white }]}>Yes, Log Me Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LogoutContent