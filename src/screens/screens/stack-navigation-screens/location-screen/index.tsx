import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { ms, spacing } from '../../../../utils/helpers/responsive'
import { useForm } from 'react-hook-form'
import { LocationContainer } from '../../../../utils/builders'
import CustomInput from '../../../../components/form-utils/custom-input'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import SubmitButton from '../../../../components/submit-button'

const LocationScreen: React.FC = () => {
    const { control, handleSubmit, setValue, } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data)
    }

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Location"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    {LocationContainer(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                            return <CustomInput key={index} {...item} />;
                        } else if (item?.type === "dropdown") {
                            return <DropdownInput key={index} {...item} />
                        }
                        else {
                            return null;
                        }
                    })}
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Submit",
                                loading: false,
                                onPress: handleSubmit(OnSubmit)
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
        </ScreenLayout>
    )
}

export default LocationScreen

const styles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    }
})
