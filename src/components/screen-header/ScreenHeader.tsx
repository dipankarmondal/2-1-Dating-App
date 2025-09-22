/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState } from 'react'

/**Local imports*/
import { ScreenHeaderStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { ScreenHeaderProps } from '../../utils/types/types'

/**Main export*/
const ScreenHeader: React.FC<ScreenHeaderProps> = ({ children, filterData, showSuggestions, setShowSuggestions }) => {
    const [selected, setSelected] = useState<string>("");

    const handleSelect = (itemKey: string) => {
        setSelected(itemKey);
        setShowSuggestions(false);
    };

    return (
        <>
            <View style={styles.dt_container}>
                {children}
            </View>
            {/* {showSuggestions && (
                <View style={styles.suggestionBox}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled>
                        {filterData?.map((item) => (
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
            )} */}
        </>
    );
};

export default ScreenHeader;