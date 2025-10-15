/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

/** Liabary*/
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import moment from 'moment'

/**Local imports*/
import { EditContentStyles as styles } from './styles'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import { UpdateProfile } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { EditProfileBuilder } from '../../../utils/builders'
import { Colors } from '../../../utils/constant/Constant'
import { Categories } from '../../common/helper'
import { ms, toast } from '../../../utils/helpers/responsive'
import { experienceLevel } from './helper'

/**Components */
import CustomInput from '../../form-utils/custom-input'
import DropdownInput from '../../form-utils/dropdown-input'
import MultiselectInput from '../../form-utils/multiselect-input/MultiselectInput'
import ModeInput from '../../form-utils/mode-input/ModeInput'
import DatePickerInput from '../../form-utils/datepicker-input'
import SubmitButton from '../../submit-button'

type Props = {
    data: any
}

/**Main export*/
const EditContent: React.FC<Props> = ({ data }) => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
    const { control, handleSubmit, setValue, reset } = useForm()

    const { Token } = useAuth();
    const QueryInvalidater = useQueryClient();

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
            item.name === "partner_experience_level" ||
            item.name === "partner_frist_name" ||
            item.name === "partner_last_name"
        ) && mode !== "couple") {
            return false;
        }
        return true;
    });

    const ProfileUpdate = useMutation({
        mutationFn: (data: any) => UpdateProfile(Token, data),
        onSuccess: (res) => {
            if (res?.success) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['user'] });
            }
        }
    })

    const OnSubmit = (data: any) => {
        const formattedDate = moment(data?.your_dob).format("YYYY-MM-DD");
        const partnerformattedDate = moment(data?.partner_dob).format("YYYY-MM-DD");

        const experienceLevelObject = experienceLevel.reduce((acc, item) => {
            acc[item.key] = item.key === data?.experience_level;
            return acc;
        }, {} as Record<string, boolean>)
        const partnerexperienceLevelObject = experienceLevel.reduce((acc, item) => {
            acc[item.key] = item.key === data?.partner_experience_level;
            return acc;
        }, {} as Record<string, boolean>)

        const Payload = {
            gender: data?.mode,
            lookingFor: selectedButtons,
            bio: data?.description,
            firstName: data?.frist_name,
            lastName: data?.last_name,
            dateOfBirth: formattedDate,
            bodyHair: data?.body_hair,
            height: data?.height,
            weight: data?.weight,
            bodyType: data?.body_type,
            ethnicBackground: data?.ethnic_background,
            smoking: data?.smoking,
            piercings: data?.piercings,
            languagesSpoken: data?.languages_spoken,
            looksAreImportant: data?.important,
            intelligenceIsImportant: data?.intelligence,
            sexuality: data?.sexuality,
            relationshipOrientation: data?.relationship_orientation,
            experienceLevel: experienceLevelObject,
            circumcised: data?.circumcised,
            tattoos: data?.tattoos,
            partner: {
                ...(data?.partner_frist_name && { firstName: data?.partner_frist_name }),
                ...(data?.partner_last_name && { lastName: data?.partner_last_name }),
                ...(data?.partner_dob && { dateOfBirth: partnerformattedDate }),
                ...(data?.partner_body_hair && { bodyHair: data?.partner_body_hair }),
                ...(data?.partner_height && { height: data?.partner_height }),
                ...(data?.partner_weight && { weight: data?.partner_weight }),
                ...(data?.partner_body_type && { bodyType: data?.partner_body_type }),
                ...(data?.partner_ethnic_background && { ethnicBackground: data?.partner_ethnic_background }),
                ...(data?.partner_smoking && { smoking: data?.partner_smoking }),
                ...(data?.partner_piercings && { piercings: data?.partner_piercings }),
                ...(data?.partner_languages_spoken && { languagesSpoken: data?.partner_languages_spoken }),
                ...(data?.partner_important && { looksAreImportant: data?.partner_important }),
                ...(data?.partner_intelligence && { intelligenceIsImportant: data?.partner_intelligence }),
                ...(data?.partner_sexuality && { sexuality: data?.partner_sexuality }),
                ...(data?.partner_relationship_orientation && { relationshipOrientation: data?.partner_relationship_orientation }),
                ...(data?.partner_experience_level && { experienceLevel: partnerexperienceLevelObject }),
                ...(data?.partner_tattoos && { tattoos: data?.partner_tattoos }),
            }
        }
        ProfileUpdate.mutate(Payload);
    }

    useEffect(() => {
        if (data?.profile?.lookingFor && Array.isArray(data.profile.lookingFor)) {
            setSelectedButtons(data.profile.lookingFor);
        }
    }, [data?.profile?.lookingFor]);

    useEffect(() => {

        setValue("mode", data?.profile?.gender);
        setValue("description", data?.profile?.bio);
        setValue("frist_name", data?.profile?.firstName);
        setValue("last_name", data?.profile?.lastName);
        setValue("your_dob", data?.profile?.dateOfBirth);
        setValue("body_hair", data?.profile?.bodyHair);
        setValue("height", data?.profile?.height);
        setValue("weight", data?.profile?.weight);
        setValue("body_type", data?.profile?.bodyType);
        setValue("ethnic_background", data?.profile?.ethnicBackground);
        setValue("smoking", data?.profile?.smoking);
        setValue("piercings", data?.profile?.piercings);
        setValue("languages_spoken", data?.profile?.languagesSpoken);
        setValue("important", data?.profile?.looksAreImportant);
        setValue("intelligence", data?.profile?.intelligenceIsImportant);
        setValue("sexuality", data?.profile?.sexuality);
        setValue("relationship_orientation", data?.profile?.relationshipOrientation);
        setValue("circumcised", data?.profile?.circumcised);
        setValue("tattoos", data?.profile?.tattoos);
        setValue("partner_frist_name", data?.profile?.partner?.firstName);
        setValue("partner_last_name", data?.profile?.partner?.lastName);
        setValue("partner_dob", data?.profile?.partner?.dateOfBirth);
        setValue("partner_body_hair", data?.profile?.partner?.bodyHair);
        setValue("partner_height", data?.profile?.partner?.height);
        setValue("partner_weight", data?.profile?.partner?.weight);
        setValue("partner_body_type", data?.profile?.partner?.bodyType);
        setValue("partner_ethnic_background", data?.profile?.partner?.ethnicBackground);
        setValue("partner_smoking", data?.profile?.partner?.smoking);
        setValue("partner_piercings", data?.profile?.partner?.piercings);
        setValue("partner_languages_spoken", data?.profile?.partner?.languagesSpoken);
        setValue("partner_important", data?.profile?.partner?.looksAreImportant);
        setValue("partner_intelligence", data?.profile?.partner?.intelligenceIsImportant);
        setValue("partner_sexuality", data?.profile?.partner?.sexuality);
        setValue("partner_relationship_orientation", data?.profile?.partner?.relationshipOrientation);
        setValue("partner_tattoos", data?.profile?.partner?.tattoos);
    }, [])

    useEffect(() => {
        const setActiveExperienceLevel = (field: string, experienceObj?: Record<string, boolean>) => {
            if (experienceObj) {
                const activeKey = Object.keys(experienceObj).find(key => experienceObj[key] === true);
                if (activeKey) {
                    setValue(field, activeKey, { shouldDirty: true });
                }
            }
        };

        setActiveExperienceLevel("experience_level", data?.profile?.experienceLevel);
        setActiveExperienceLevel("partner_experience_level", data?.profile?.partner?.experienceLevel);
    }, [data?.profile?.experienceLevel, data?.profile?.partner?.experienceLevel]);

    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_profile_header_text}>{data?.username}</Text>
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
                            loading: ProfileUpdate.isPending,
                            onPress: handleSubmit(OnSubmit),
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default EditContent
