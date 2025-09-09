import { View, Text } from 'react-native'
import React from 'react'
import { ViewMeScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

const ViewMeScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <ScreenHeader
                {...{
                    isHeader: true,
                    headerText: "View Me"
                }}
            />
        </ScreenLayout>
    )
}

export default ViewMeScreen