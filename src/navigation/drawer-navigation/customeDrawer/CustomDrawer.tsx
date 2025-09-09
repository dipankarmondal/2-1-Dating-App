/**React Imports */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

/** Liabary*/
import { DrawerContentComponentProps, } from '@react-navigation/drawer';
import * as ImagePicker from 'react-native-image-picker';

/**Local imports*/
import { IconProps } from '../../../utils/helpers/Iconprops';
import { CustomDrawerStyles as styles } from './styles'
import { useAuth } from '../../../utils/context/auth-context/AuthContext';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';

/**Icons*/
import RightIcon from '@svgs/angle-small-right.svg'
import ReportIcon from '@svgs/report.svg'
import LogoutIcon from '@svgs/user-logout.svg'
import LogoutContent from '../../../components/modal/modal-content/logout-content/LogoutContent';
import ModalAction from '../../../components/modal/modal-action/ModalAction';

/**Components */
// import ModalAction from '../../../components/modal/modal-action/ModalAction';

/**Main export*/
const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ state, navigation, descriptors }) => {
    const { logout, Token } = useAuth();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogoutPress = () => setIsLogoutModalVisible(true);
    const handleLogoutConfirm = () => {
        setIsLogoutModalVisible(false);
        logout();
    };
    const handleCancel = () => setIsLogoutModalVisible(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <TouchableOpacity style={styles.header} activeOpacity={0.7}>
                <View style={styles.sa_avatar}>
                    <Image
                        source={require('@images/user.png')}
                        style={styles.sa_img}
                    />
                </View>
                <View style={styles.dt_right_container}>
                    <View>
                        <Text style={styles.title}>Pratik das</Text>
                        <Text style={styles.dt_number}>+91 123456789</Text>
                    </View>
                </View>
                <View style={styles.dt_edit}>
                    <RightIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                </View>
            </TouchableOpacity>
            {/* Drawer Items */}
            <ScrollView style={{ flex: 1, paddingTop: ms(5) }}>
                <View style={{ gap: ms(5), paddingHorizontal: ms(10) }}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        const { drawerLabel, drawerIcon } = descriptors[route.key].options;
                        const routeName = route.name;
                        return (
                            <React.Fragment key={route.key}>
                                <TouchableOpacity
                                    style={[styles.item, isFocused && styles.itemActive, { justifyContent: 'space-between' }]}
                                    onPress={() => navigation.navigate(routeName)}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {drawerIcon?.({
                                            focused: isFocused,
                                            color: Colors.dt_white,
                                            size: 25,
                                        })}
                                        <Text style={[styles.label, isFocused && styles.labelActive]}>
                                            {typeof drawerLabel === 'string' ? drawerLabel : routeName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </React.Fragment>
                        );
                    })}
                </View>
            </ScrollView>
            {/* Footer - Logout */}
            <TouchableOpacity
                style={[styles.logout, { marginBottom: ms(0), backgroundColor: Colors.dt_gray + "36" }]}
                // onPress={handleLogoutPress}
                activeOpacity={0.7}
            >
                <ReportIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                <Text style={styles.logoutText}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.logout,]}
                onPress={() => setShowDropdown(true)}
                activeOpacity={0.7}
            >
                <LogoutIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
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
    );
};

export default CustomDrawerContent;