/**React Imports */
import React from 'react';

/**Local imports*/
import { IconProps } from '../../utils/helpers/Iconprops';


/**Components */
import { Drawer } from '../navigation-types/NavigationTypes';
import CustomDrawerContent from './customeDrawer/CustomDrawer';
import { DrawerScreens } from '../navigation-helper/helper';
import { ms } from '../../utils/helpers/responsive';
import { Colors } from '../../utils/constant/Constant';
import FeedScreen from '../../screens/screens/drawer-navigation-screens/feed-screen';

/**Main export*/
const DrawerNavigator: React.FC = () => {

    const drawerStyle = {
        backgroundColor: Colors.dt_border,
        borderRadius: 0,
        width: ms(300),
    };

    const drawerLabelStyle = {
        fontSize: 15,
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerType: 'slide',
                drawerPosition: 'left',
                drawerStyle,
                drawerLabelStyle,
                headerShown: false
            }}
            id={undefined}
        >
            {DrawerScreens.map(({ name, component, label, Icon, size }) => (
                <Drawer.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        drawerLabel: label,
                        drawerIcon: ({ focused }) => (
                            <Icon {...IconProps(ms(size))} fill={focused ? Colors.dt_black : Colors.dt_white} />
                        ),
                    }}
                />
            ))}
        </Drawer.Navigator>
    );

};

export default DrawerNavigator;