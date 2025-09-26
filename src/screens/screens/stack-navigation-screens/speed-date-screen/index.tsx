/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { SpeedDateScreenStyles as styles } from './styles'
import { ms } from '../../../../utils/helpers/responsive'
import { SpeedDateBuilder } from '../../../../utils/builders'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import CustomInput from '../../../../components/form-utils/custom-input'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import DatePickerInput from '../../../../components/form-utils/datepicker-input'
import ChooseIntrestInput from '../../../../components/form-utils/choose-intrest-input/ChooseIntrestInput'
import SubmitButton from '../../../../components/submit-button'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Main export*/
const SpeedDateScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset, } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data);
    }

    return (
        <ScreenLayout
            {...{ 
                type: "stack",
                title: "Speed Date"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_content}>
                        <Text style={styles.dt_rules_text}>You can upload only one Speed Date at a time, up to 2 weeks in advance. Each Speed Date can last a maximum of 4 days (which you can select in the calendar), but Virtual Dates are limited to 1 day only (and you will be asked to specify the time). RULES !!!</Text>
                        <Text style={[styles.dt_rules_text, { marginTop: ms(10) }]}>Do not use this feature to post an ad for a party, product or service. Posts without personal text or mention an external communication program such as email, phone number, Kik, Skype, WhatsApp etc. will be removed. For direct contact with 2+1 members, please use the Iphone or Android 2+1 APP.</Text>
                        <View style={styles.dt_form_container}>
                            {SpeedDateBuilder(control)?.map((item, index) => {
                                if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                    return <CustomInput key={index} {...item} />;
                                } else if (item?.type === "dropdown") {
                                    return <DropdownInput key={index} {...item} />
                                } else if (item?.type === "dob") {
                                    return <DatePickerInput key={index} {...item} />
                                } else if (item?.type === "choose") {
                                    return <ChooseIntrestInput key={index} {...item} flag="speed_date" />
                                }
                            })}
                        </View>
                    </View>
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Post Speed Date",
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

export default SpeedDateScreen