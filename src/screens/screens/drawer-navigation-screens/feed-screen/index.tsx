/**React Imports */
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

/**Local imports*/
import { FrindItems, GeneralItems, HeaderBtn } from '../../../../components/common/helper'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import GobalFeedContent from './GobalFeedContent'
import { Colors } from '../../../../utils/constant/Constant'
import { ms } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import Notification from './Notification'

/**Main export*/
const FeedScreen: React.FC<{ route: any }> = ({ route }) => {
    const [activeKey, setActiveKey] = React.useState("feed");
    const [activeFilter, setActiveFilter] = useState<"general" | "friend" | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const menuItems = activeFilter === "general" ? GeneralItems : activeFilter === "friend" ? FrindItems : [];

    const { key } = route.params || {}

    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key]);

    const renderTab = (item: { key: string; title: string }) => {
        const isActive = item.key === activeKey;
        return (
            <TouchableOpacity
                key={item.key}
                style={[commonstyle.dt_title_container, isActive && { borderBottomWidth: ms(1), borderBottomColor: "white" }]}
                onPress={() => setActiveKey(item.key)}
            >
                <Text style={[commonstyle.dt_tab_title, { color: isActive ? Colors.dt_white : Colors.dt_gray + "89" }]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderFilterButton = (label: string, type: "general" | "friend", color?: string) => (
        <TouchableOpacity
            style={[commonstyle.dt_filter, color && { borderColor: color, marginLeft:ms(-15) }]}
            onPress={() => {
                setActiveFilter(type);
                setShowSuggestions((prev) => !prev);
            }}
        >
            <Text style={[commonstyle.dt_filter_text, color && { color }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            {...{
                setUpdateKey: setActiveKey,
                type: "feed"
            }}
        >
            <ScreenHeader
                {...{
                    filterData: menuItems,
                    showSuggestions,
                    setShowSuggestions
                }}
            >
                <View style={commonstyle.dt_header}>{HeaderBtn.map(renderTab)}</View>
                {renderFilterButton("General Filter", "general")}
                {renderFilterButton("Friend Filter", "friend", Colors.dt_error)}
            </ScreenHeader>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    {
                        activeKey === "feed" ?
                            <GobalFeedContent /> :
                            <Notification />
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default FeedScreen