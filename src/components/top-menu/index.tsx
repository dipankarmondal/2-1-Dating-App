/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { TopMenuStyles as styles } from './styles'
import { TopMenuProps } from '../../utils/types/types'

/**Main export*/
const TopMenu: React.FC<TopMenuProps> = ({ MenuData, activeKey, setActiveKey, isTwoItem }) => {

    return (
        <View style={styles.menuContainer}>
            <ScrollView horizontal={isTwoItem ? false : true} showsHorizontalScrollIndicator={false} >
                <View style={[styles.menu]}>
                    {MenuData.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => setActiveKey(item.key)}
                            style={[
                                styles.menuItem,
                                activeKey === item.key && styles.activeMenuItem,
                                isTwoItem && styles.dt_isTwoItem
                            ]}
                        >
                            <Text
                                style={[
                                    styles.menuText,
                                    activeKey === item.key && styles.activeMenuText,
                                ]}
                            >
                                {item.label}
                            </Text>
                            {/* <View style={styles.dt_badge}>
                                <Text style={styles.dt_badge_text}>0</Text>
                            </View> */}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default TopMenu