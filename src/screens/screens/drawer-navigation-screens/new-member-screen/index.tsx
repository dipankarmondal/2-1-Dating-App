/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { ViewMeOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

/**Main export*/
const NewMemberScreen: React.FC = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    return (
        <ScreenLayout>
            <ScreenHeader
                {...{
                    filterData: ViewMeOptions,
                    showSuggestions,
                    setShowSuggestions
                }}
            >
                <Text style={CommonStyles.dt_header_title}>New Member</Text>
                <TouchableOpacity
                    style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                    onPress={() => {
                        setShowSuggestions((prev) => !prev);
                    }}
                >
                    <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                </TouchableOpacity>
            </ScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default NewMemberScreen