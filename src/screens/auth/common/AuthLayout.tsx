/**React Imports */
import { View, Text, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'

/**Local imports*/
import { AuthLayoutStyles as styles } from './styles'
import { AuthProps } from '../../../utils/types/types'
import { ms } from '../../../utils/helpers/responsive'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { Colors } from '../../../utils/constant/Constant'
import LogoutContent from '../../../components/modal/modal-content/logout-content/ModalContent'

/**Icons*/
import LogoutIcon from '@svgs/user-logout.svg'
import LeftIcon from '@svgs/arrow-alt-circle-left.svg'

/**Components */
import ModalAction from '../../../components/modal/modal-action/ModalAction'
import { useNavigation } from '@react-navigation/native'
import ModalContent from '../../../components/modal/modal-content/logout-content/ModalContent'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

/**Main export*/
const AuthLayout: React.FC<AuthProps> = ({ children, titile, type, isBack, isSubtext }) => {
    const [showDropdown, setShowDropdown] = React.useState(false)
    const Navigation = useNavigation<any>()
    const { logout } = useAuth();

    const SuccessLogout = () => {
        setShowDropdown(false)
        logout()
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_content}>
                    <View style={styles.dt_image_container}>
                        <Image source={require('@images/logo.png')} style={styles.dt_image} />
                    </View>
                    <View style={styles.dt_content_box}>
                        <View style={[styles.dt_header, { justifyContent: type === "profileSetup" ? "space-between" : "center" }]}>
                            <Text style={styles.dt_title}>{titile}</Text>
                            {
                                type === "profileSetup" &&
                                <TouchableOpacity style={styles.dt_logout} onPress={() => setShowDropdown(true)}>
                                    <LogoutIcon {...IconProps(ms(19))} fill={Colors.dt_error} />
                                </TouchableOpacity>
                            }
                        </View>
                        {
                            isSubtext && (
                                <Text style={styles.dt_subtext}>Please provide details below. All fields are mandatory.</Text>
                            )
                        }
                        <View style={{ marginTop: ms(15) }}>
                            {children}
                        </View>
                        {
                            isBack && (
                                <TouchableOpacity style={styles.dt_back} onPress={() => Navigation.goBack()}>
                                    <LeftIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                                    <Text style={styles.dt_back_text}>go back</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Are you sure you want to logout?"
                type="logout"
            >
                <ModalContent
                    {...{
                        setModal:setShowDropdown,
                        title:"Do you want to log out from your account?",
                        successText:"Yes, Log Me Out",
                        cancelText:"No, Stay Logged In",
                        onSuccess:()=> SuccessLogout()
                    }}
                />
            </ModalAction>
        </View>
    )
}

export default AuthLayout