/**React Imports */
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'

/**Local imports*/
import { SearchBoxStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'

/**Icons*/
import SearchIcon from '@svgs/search.svg' 
import CrossIcon from '@svgs/cross.svg'
import FilterIcon from '@svgs/filter.svg'
import { SearchBoxProps } from '../../utils/types/types'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'

/**Main export*/
const SearchBox: React.FC<SearchBoxProps> = ({ setSearchText, searchText, type, activeKey, levelOptions, onLevelSelect }) => {
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [SelectedLavel, setSelectedLavel] = React.useState(null);

    const EmptyState = () => {
        setSelectedLavel("")
        setSearchText(null)
        setShowSuggestions(false)
    }

    useEffect(() => {
        if (levelOptions?.length > 0 && !SelectedLavel && activeKey === "level-view") {
            setSelectedLavel(levelOptions[0]?.level);
            onLevelSelect(levelOptions[0]);
        }
    }, [levelOptions, activeKey]);

    useEffect(() => {
        if (activeKey !== "level-view") {
            EmptyState();
        }
    }, [activeKey]);

    const searchWidthType = activeKey === "level-view" ? "85%" : "100%"

    return (
        <View style={styles.dt_search_box}>
            <View style={[
                styles.dt_search_box_container,
                {
                    height: type === 'dropdown' ? ms(40) : ms(47),
                    width: searchWidthType
                }
            ]}
            >
                <SearchIcon {...IconProps(ms(20))} fill={Colors.dt_gray + '78'} />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={Colors.dt_gray + '78'}
                    style={styles.dt_search_input}
                    onChangeText={setSearchText}
                    value={searchText}
                    selectionColor={Colors.dt_border}
                />
                {
                    SelectedLavel && (
                        <Text style={[styles.dt_search_input, { flex: 0, marginRight: ms(6) }]}>
                            Level {SelectedLavel}
                        </Text>
                    )
                }
                {
                    (SelectedLavel || searchText) && (
                        <TouchableOpacity
                            style={styles.dt_cross_container}
                            activeOpacity={0.7}
                            onPress={EmptyState}
                        >
                            <CrossIcon {...IconProps(ms(15))} fill={Colors.dt_border} />
                        </TouchableOpacity>
                    )
                }
            </View>
            

            {showSuggestions && activeKey === "level-view" && (
                <View style={styles.suggestionBox}>
                    <ScrollView nestedScrollEnabled>
                        {levelOptions?.map((option, index) => {
                            const isSelected = SelectedLavel === option?.level;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.suggestionItem, isSelected && { backgroundColor: Colors.dt_bg }]}
                                    onPress={() => {
                                        setSelectedLavel(option?.level);
                                        setShowSuggestions(false);
                                        onLevelSelect(option);
                                    }}
                                >
                                    <Text style={[styles.suggestionText, {color: isSelected ? Colors.dt_white : Colors.dt_black}]}>
                                        Level {option?.level}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}
export default SearchBox