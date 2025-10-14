import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { CommonStyles } from '../../common/CommonStyle'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors, Fonts } from '../../../../utils/constant/Constant'
import SubmitButton from '../../../../components/submit-button'

const HideProfileScreen: React.FC = () => {
    return (
        <ScreenLayout type="stack" title="Hide Profile">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    <Text style={styles.dt_rules_text}>When you set your account to Inactive, your profile will be hidden on 2+1. You will be invisible until you decide to log in again, at which time your profile will become Activeand visible to others.Time remaining on your current membership will run its course while your profile is set to inactive. If you have paid for your membership directly on the 2+1 website, then your recurring billing will be switched off.</Text>

                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Hide Profile",
                                loading: false,
                                onPress: () => { }
                            }}
                        />
                    </View>
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default HideProfileScreen

const styles = StyleSheet.create({
    dt_rules_text: {
        fontSize: ms(15),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_500
    },
})
