/**React Imports */
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

/**Local imports*/
import AuthLayout from '../common/AuthLayout'
import { ProfileSetupBuilder } from '../../../utils/builders'
import { ms, toast } from '../../../utils/helpers/responsive'
import { UpdateProfileSetup } from '../../../utils/api-calls/auth-calls/AuthCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import { ProfileSetupStyles as styles } from './styles'

/** Liabary*/
import { useForm, useWatch } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

/**Components */
import CustomInput from '../../../components/form-utils/custom-input'
import ModeInput from '../../../components/form-utils/mode-input/ModeInput'
import DropdownInput from '../../../components/form-utils/dropdown-input'
import DatePickerInput from '../../../components/form-utils/datepicker-input'
import ChooseIntrestInput from '../../../components/form-utils/choose-intrest-input/ChooseIntrestInput'
import ImagePickerChoose from '../../../components/form-utils/image-picker-choose/ImagePickerChoose'
import SubmitButton from '../../../components/submit-button'
import { GetUser } from '../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Main export*/
const ProfileSetup: React.FC = () => {

    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();
    const Navigation = useNavigation<any>()

    const { control, handleSubmit, setValue, formState: { errors }, reset, } = useForm({
        defaultValues: {
            mode: "couple",
        },
    })

    const mode = useWatch({
        control,
        name: "mode",
    });

    const { data } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })

    const ProfileSetUpMutation = useMutation({
        mutationFn: (data: any) => UpdateProfileSetup(Token, data),
        onSuccess: (res) => {
            console.log("ProfileSetUpMutation", res);
            if (res?.success === true) {
                QueryInvalidater.invalidateQueries({ queryKey: ['GetUser'] });
                toast("success", { title: res?.message });
            }
        },
    })

    const OnSubmit = (data: any) => {
        const Payload: any = {
            gender: data?.mode,
            sexuality: data?.your_sex,
            dateOfBirth: data?.your_dob,
            interestedIn: data?.intrest,
            // phone:"9988776655",
            address: {
                city: data?.city,
                state: data?.state,
                country: data?.country,
                street: data?.address,
                zipcode: data?.zipcode
            },
            bio: data?.profile_bio,
            photos: data?.file
        }

        if (data?.mode === "couple") {
            Payload.partner = {
                sexuality: data?.partner_sex,
                dateOfBirth: data?.partner_dob
            }
        }

        ProfileSetUpMutation.mutate(Payload);
    };

    // Build fields dynamically
    const fields = ProfileSetupBuilder(control).filter((item) => {
        if ((item.name === "partner_sex" || item.name === "partner_dob") && mode !== "couple") {
            return false;
        }
        return true;
    });

    return (
        <AuthLayout
            {...{
                titile: "Profile Setup",
                type: "profileSetup"
            }}
        >
            <View style={styles.dt_container}>
                <TouchableOpacity onPress={() => Navigation.navigate("BusinessSignupScreen")}>
                    <Text style={styles.dt_business_signup}>Business Signup</Text>
                </TouchableOpacity>
                {fields.map((item, index) => {
                    if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                        return <CustomInput key={index} {...item} />;
                    } else if (item?.type === "mode") {
                        return <ModeInput key={index} {...item} />
                    } else if (item?.type === "dropdown") {
                        return <DropdownInput key={index} {...item} />
                    } else if (item?.type === "dob") {
                        return <DatePickerInput key={index} {...item} />
                    } else if (item?.type === "choose") {
                        return <ChooseIntrestInput key={index} {...item} />
                    } else if (item?.type === "file") {
                        return <ImagePickerChoose key={index} {...item} />
                    }
                })}
                <View style={{ marginTop: ms(10) }}>
                    <SubmitButton
                        {...{
                            text: "Submit",
                            loading: ProfileSetUpMutation.isPending,
                            onPress: handleSubmit(OnSubmit)
                        }}
                    />
                </View>
            </View>
        </AuthLayout>
    )
}

export default ProfileSetup