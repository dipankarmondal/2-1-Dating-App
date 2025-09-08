/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ScreenHeaderStyles as styles } from './styles'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { FrindItems, GeneralItems } from '../common/helper'
import { ScreenHeaderProps } from '../../utils/types/types'

/**Main export*/
const ScreenHeader: React.FC<ScreenHeaderProps> = ({ activeKey, setActiveKey, Header }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState<"general" | "friend" | null>(null);

    const menuItems = activeFilter === "general" ? GeneralItems : activeFilter === "friend" ? FrindItems : [];

    const handleSelect = (itemKey: string) => {
        setSelected(itemKey);
        setShowSuggestions(false);
    };

    const renderTab = (item: { key: string; title: string }) => {
        const isActive = item.key === activeKey;
        return (
            <TouchableOpacity
                key={item.key}
                style={[styles.dt_title_container, isActive && { borderBottomWidth: ms(1), borderBottomColor: "white" }]}
                onPress={() => setActiveKey(item.key)}
            >
                <Text style={[styles.dt_title, { color: isActive ? Colors.dt_white : Colors.dt_gray + "89" }]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderFilterButton = (label: string, type: "general" | "friend", color?: string) => (
        <TouchableOpacity
            style={[styles.dt_filter, color && { borderColor: color }]}
            onPress={() => {
                setActiveFilter(type);
                setShowSuggestions((prev) => !prev);
            }}
        >
            <Text style={[styles.dt_filter_text, color && { color }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.dt_container}>
                <View style={styles.dt_header}>{Header.map(renderTab)}</View>
                <View style={styles.dt_filter_container}>
                    {renderFilterButton("General Filter", "general")}
                    {renderFilterButton("Friend Filter", "friend", Colors.dt_error)}
                </View>
            </View>

            {showSuggestions && (
                <View style={styles.suggestionBox}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => handleSelect(item.key)}
                                style={[styles.suggestionItem, selected === item.key && { backgroundColor: Colors.dt_bg + "33" }]}
                            >
                                <Text
                                    style={[
                                        styles.suggestionText,
                                        { color: selected === item.key ? Colors.dt_bg : Colors.dt_black },
                                    ]}
                                >
                                    {item.value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </>
    );
};

export default ScreenHeader;