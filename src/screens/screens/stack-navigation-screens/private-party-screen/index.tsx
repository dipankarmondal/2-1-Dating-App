/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { PrivatePartyScreenStyles as styles } from './styles'
import { ms } from '../../../../utils/helpers/responsive'
import { PrivatePartyBuilder } from '../../../../utils/builders'

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
const PrivatePartyScreen: React.FC = () => {
    const { control, handleSubmit, setValue, watch, formState: { errors }, reset, } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data);
    }

    const selectedIntrest = watch("intrest");

    const filteredFields = PrivatePartyBuilder(control).filter(item => {
        // Always include non-age fields
        if (!item.name.includes("age")) return true;

        // If intrest is an array
        if (Array.isArray(selectedIntrest)) {
            const ageMap: Record<string, string[]> = {
                couple: ["female_age_from", "female_age_until", "male_age_from", "male_age_until"],
                female: ["female_age_from", "female_age_until"],
                male: ["male_age_from", "male_age_until"],
                transgender: ["transgender_age_from", "transgender_age_until"],
            };

            // Include field if it exists in any of the selected interests
            return selectedIntrest.some(intrest => ageMap[intrest]?.includes(item.name));
        }

        return false;
    });

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Create Private Party"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(50) }}>
                <View style={styles.dt_container}>
                    <View>
                        <Text style={styles.dt_rules_text}>Post a private, non commercial party using the form below. Once complete, click the OK button and your party will be reviewed and then approved by member PARTY.
                        </Text>
                        <Text style={[styles.dt_rules_text, { marginVertical: ms(10) }]}>
                            Your private party will appear on your profile and in the main party calendar, visible to all members.
                        </Text>
                        <Text style={styles.dt_rules_text}>
                            Please contact member PARTY for questions.
                        </Text>
                    </View>
                    <View style={styles.dt_form_container}>
                        {filteredFields?.map((item, index, arr) => {
                            if (item._skip) return null;
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item?.type === "dropdown") {
                                if (item.isDubble) {
                                    const nextItem = arr[index + 1];
                                    if (nextItem?.isDubble) {
                                        nextItem._skip = true;
                                        return (
                                            <View key={index} style={styles.dt_download_row}>
                                                <View style={{ flex: 1, marginRight: 8 }}>
                                                    <DropdownInput {...item} />
                                                </View>
                                                <View style={{ flex: 1, marginLeft: 8 }}>
                                                    <DropdownInput {...nextItem} />
                                                </View>
                                            </View>
                                        );
                                    }
                                } else {
                                    // Render single dropdown
                                    return <DropdownInput key={index} {...item} />;
                                }
                            } else if (item?.type === "dob") {
                                return <DatePickerInput key={index} {...item} />
                            } else if (item?.type === "choose") {
                                return <ChooseIntrestInput key={index} {...item} flag="speed_date" />
                            }
                        })}
                        <View style={{ marginTop: ms(5) }}>
                            <SubmitButton
                                {...{
                                    text: "Post",
                                    loading: false,
                                    onPress: handleSubmit(OnSubmit)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default PrivatePartyScreen