import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { PartyEventDetailsScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'
import { ms } from '../../../../utils/helpers/responsive'

type Props = {
    route: any
}

const PartyEventDetailsScreen: React.FC<Props> = ({ route }) => {
    const { header } = route.params || {}
    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: header
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(50) }}>
                <View style={styles.dt_container}>
                    <Text style={{color:"white"}}>helo</Text>
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default PartyEventDetailsScreen 