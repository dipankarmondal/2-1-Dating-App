/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { SuggestionStyles as styles } from './styles'
import { SuggestionBoxProps } from '../../utils/types/types'
import { Colors } from '../../utils/constant/Constant'

/**Components */

/**Main export*/
const SuggestionBox: React.FC<SuggestionBoxProps> = ({ showDropdown, setShowDropdown, filteredProducts, value, onChange }) => {
    return (
        <>
            {showDropdown && (
                <View style={styles.dropdownList}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
                        {
                            filteredProducts.map(option => (
                                <TouchableOpacity
                                    key={option.key}
                                    style={[
                                        styles.dropdownItem,
                                        option.key === value && { backgroundColor: Colors.dt_bg + '33' },
                                    ]}
                                    onPress={() => {
                                        onChange(option.key);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.dropdownItemText,
                                            { color: option.key === value ? Colors.dt_bg : Colors.dt_black },
                                        ]}
                                    >
                                        {option.value}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            )}
        </>
    )
}

export default SuggestionBox