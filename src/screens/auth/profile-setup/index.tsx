import { View, Text } from 'react-native'
import React from 'react'
import AuthLayout from '../common/AuthLayout'
import { useForm, useWatch } from 'react-hook-form'
import { ProfileSetupBuilder } from '../../../utils/builders'
import CustomInput from '../../../components/form-utils/custom-input'
import ModeInput from '../../../components/form-utils/mode-input/ModeInput'
import DropdownInput from '../../../components/form-utils/dropdown-input'
import DatePickerInput from '../../../components/form-utils/datepicker-input'
import ChooseIntrestInput from '../../../components/form-utils/choose-intrest-input/ChooseIntrestInput'
import ImagePickerChoose from '../../../components/form-utils/image-picker-choose/ImagePickerChoose'
import SubmitButton from '../../../components/submit-button'
import { ms } from '../../../utils/helpers/responsive'

const ProfileSetup: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset, } = useForm({
        defaultValues: {
            mode: "couple",
        },
    })

    const mode = useWatch({
        control,
        name: "mode",
    });

    const OnSubmit = (data: any) => {
        console.log("object", data);
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
                        text: "Login",
                        loading: false,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
        </AuthLayout>
    )
}

export default ProfileSetup