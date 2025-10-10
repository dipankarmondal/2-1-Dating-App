/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'

/**Local imports*/
import { EditContentStyles as styles } from './styles'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import { GetUser } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { EditProfileBuilder } from '../../../utils/builders'
import { Colors } from '../../../utils/constant/Constant'
import { Categories } from '../../common/helper'
import { ms } from '../../../utils/helpers/responsive'

/**Components */
import CustomInput from '../../form-utils/custom-input'
import DropdownInput from '../../form-utils/dropdown-input'
import MultiselectInput from '../../form-utils/multiselect-input/MultiselectInput'
import ModeInput from '../../form-utils/mode-input/ModeInput'
import DatePickerInput from '../../form-utils/datepicker-input'
import SubmitButton from '../../submit-button'

/**Main export*/
const EditContent: React.FC = () => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

    const { Token } = useAuth()

    const { control, handleSubmit, setValue, reset } = useForm()

    const { data } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })


    const handlePress = (label: string) => {
        setSelectedButtons((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label) // remove if already selected
                : [...prev, label] // add if not selected
        );
    };

    const mode = useWatch({
        control,
        name: "mode",
    });

    const fields = EditProfileBuilder(control).filter((item) => {
        if ((
            item.name === "partner_full_name" ||
            item.name === "partner_dob" ||
            item.name === "partner_body_hair" ||
            item.name === "partner_height" ||
            item.name === "partner_weight" ||
            item.name === "partner_body_type" ||
            item.name === "partner_ethnic_background" ||
            item.name === "partner_smoking" ||
            item.name === "partner_piercings" ||
            item.name === "partner_tattoos" ||
            item.name === "partner_languages_spoken" ||
            item.name === "partner_important" ||
            item.name === "partner_intelligence" ||
            item.name === "partner_sexuality" ||
            item.name === "partner_relationship_orientation" ||
            item.name === "partner_experience_level"
        ) && mode !== "couple") {
            return false;
        }
        return true;
    });

    const OnSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_profile_header_text}>{data?.data?.username}</Text>
            <View style={styles.dt_form_container}>
                {fields?.map((item, index, arr) => {
                    if (item._skip) return null;
                    if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                        return <CustomInput key={index} {...item} />;
                    } else if (item?.type === "dropdown") {
                        if (item.isDubble) {
                            const nextItem = arr[index + 1];
                            if (nextItem?.isDubble) {
                                nextItem._skip = true;
                                return (
                                    <View key={index} style={styles.dt_dropdown_container}>
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
                    } else if (item.type === 'multi') {
                        return <MultiselectInput key={index} {...item} />
                    } else if (item.type === 'mode') {
                        return <ModeInput key={index} {...item} />
                    } else if (item.type === 'multichoose') {
                        return (
                            <View key={index}>
                                <Text style={styles.dt_multibuttons_text}>What are you looking for on SDC?</Text>
                                <View style={styles.dt_multibuttons_container}>
                                    <View style={styles.dt_multibuttons}>
                                        {Categories.map((category) => (
                                            <ScrollView
                                                key={category.id}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginBottom: 10, paddingLeft: 10 }}
                                            >
                                                {category.btnsData.map((label, index) => {
                                                    const isActive = selectedButtons.includes(label);
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => handlePress(label)}
                                                            style={[
                                                                styles.button,
                                                                {
                                                                    backgroundColor: isActive ? Colors.dt_card_blue : "transparent",
                                                                    borderColor: isActive ? Colors.dt_black : Colors.dt_gray,
                                                                },
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.buttonText,
                                                                    { color: isActive ? Colors.dt_white : Colors.dt_gray },
                                                                ]}
                                                            >
                                                                {label}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </ScrollView>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })}
                <View style={{ marginTop: ms(5) }}>
                    <SubmitButton
                        {...{
                            text: "Save",
                            loading: false,
                            onPress: handleSubmit(OnSubmit),
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default EditContent
