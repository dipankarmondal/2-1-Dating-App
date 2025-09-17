/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ViewMeScreenStyles as styles } from './styles'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { ViewMeOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

/**Main export*/
const ViewMeScreen: React.FC = () => {
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
                <Text style={commonstyle.dt_header_title}>View Me</Text>
                <TouchableOpacity
                    style={[commonstyle.dt_filter, { borderColor: Colors.dt_error }]}
                    onPress={() => {
                        setShowSuggestions((prev) => !prev);
                    }}
                >
                    <Text style={[commonstyle.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                </TouchableOpacity>
            </ScreenHeader>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption:false,
                            isGallery: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption:false,
                            isGallery: true
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default ViewMeScreen 