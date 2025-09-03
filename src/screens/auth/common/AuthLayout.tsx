/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { AuthLayoutStyles as styles } from './styles'
import { AuthProps } from '../../../utils/types/types'
import { ms } from '../../../utils/helpers/responsive'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { Colors } from '../../../utils/constant/Constant'
import LogoutContent from '../../../components/modal/modal-content/logout-content/LogoutContent'

/**Icons*/
import LogoutIcon from '@svgs/user-logout.svg'

/**Components */
import ModalAction from '../../../components/modal/modal-action/ModalAction'

/**Main export*/
const AuthLayout: React.FC<AuthProps> = ({ children, titile, type }) => {
    const [showDropdown, setShowDropdown] = React.useState(false)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_content}>
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
                        <View style={{ marginTop: ms(15) }}>
                            {children}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Are you sure you want to logout?"
                type="logout"
            >
                <LogoutContent
                    {...{
                        setShowDropdown,
                    }}
                />
            </ModalAction>
        </View>
    )
}

export default AuthLayout