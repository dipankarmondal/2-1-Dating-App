/**React Imports */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

/** Liabary*/
import { DrawerContentComponentProps, } from '@react-navigation/drawer';

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

/**Components */
import ModalAction from '../../../components/modal/modal-action/ModalAction';
import ModalContent from '../../../components/modal/modal-content/logout-content/ModalContent';
import { useQuery } from '@tanstack/react-query';
import { GetUser } from '../../../utils/api-calls/content-api-calls/ContentApiCall';
import { useNavigation } from '@react-navigation/native';

/**Main export*/
const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ state, navigation, descriptors }) => {
    const { logout, Token } = useAuth();

    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogoutConfirm = () => {
        setShowDropdown(false);
        logout();
    };

    const {data} = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <TouchableOpacity style={styles.header} activeOpacity={0.7} onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.sa_avatar}>
                    <Image
                        source={data?.data?.profile?.photos ? { uri: data?.data?.profile?.photos[0] } : require('@images/user.png')}
                        style={styles.sa_img}
                    />
                </View>
                <View style={styles.dt_right_container}>
                    <View>
                        <Text style={styles.title}>{data?.data?.username ?? "--"}</Text>
                        <Text style={styles.dt_number}>{data?.data?.email ?? "--"}</Text>
                    </View>
                </View>
                <View style={styles.dt_edit}>
                    <RightIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                </View>
            </TouchableOpacity>
            {/* Drawer Items */}
            <ScrollView style={{ flex: 1, paddingTop: ms(5) }}>
                <View style={{ gap: ms(5), padding: ms(10) }}>
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
                <ModalContent
                    {...{
                        setModal: setShowDropdown,
                        title: "Do you want to log out from your account?",
                        successText: "Yes, Log Me Out",
                        cancelText: "No, Stay Logged In",
                        onSuccess: () => handleLogoutConfirm()
                    }}
                />
            </ModalAction>
        </View>
    );
};

export default CustomDrawerContent;