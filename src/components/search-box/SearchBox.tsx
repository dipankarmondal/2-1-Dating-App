/**React Imports */
import { View,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { SearchBoxstyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { ms } from '../../utils/helpers/responsive'
import { IconProps } from '../../utils/helpers/Iconprops'

/**Icons*/
import SearchIcon from '@svgs/search.svg'
import CrossIcon from '@svgs/cross.svg'

type Props = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

/**Main export*/
const SearchBox: React.FC<Props> = ({ search, setSearch }) => {

    return (
        <View style={styles.dt_search_wrapper}>
            <SearchIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
            <TextInput
                placeholder="Search..."
                placeholderTextColor={Colors.dt_gray}
                style={styles.dt_search_input}
                selectionColor={Colors.dt_white}
                value={search}
                onChangeText={setSearch}
            />
            {search.length > 0 && (
                <TouchableOpacity
                    style={styles.dt_clear_btn}
                    onPress={() => setSearch('')}
                >
                    <CrossIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default SearchBox 