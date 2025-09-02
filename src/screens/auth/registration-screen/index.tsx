/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { RegistrationScreenStyles as styles } from './styles'
import { RegisterBuilder } from '../../../utils/builders'
import { ms } from '../../../utils/helpers/responsive'
import { RegisterSchema } from '../../../utils/schemas/Schemas'

/**Components */
import AuthLayout from '../common/AuthLayout'
import PhoneInputForm from '../../../components/form-utils/phone-input/PhoneInput'
import CustomInput from '../../../components/form-utils/custom-input'
import SubmitButton from '../../../components/submit-button'
import CheckBoxs from '../../../components/form-utils/check-box'

/** Liabary*/
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const RegistrationScreen: React.FC = () => {
    const [Phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isAge, setIsAge] = useState<boolean>(false);

    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            termsAccepted: false,
            age_error: false
        },
    })

    const Navigation = useNavigation<any>()

    const OnSubmit = (data: any) => {
        console.log("✅ Form Data:", data);
    };

    return (
        <AuthLayout
            {...{
                titile: "Create Member Account"
            }}
        >
            {RegisterBuilder(control).map((item, index) => {
                if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                    return <CustomInput key={index} {...item} />;
                } else if (item.type === 'phone') {
                    return <PhoneInputForm key={index} {...item} setPhone={setPhone} />;
                }
            })}
            <CheckBoxs
                control={control}
                setValue={setValue}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                errorMessage={errors.termsAccepted?.message}
                name="termsAccepted"
                text="I agree to the Terms of Service and Privacy Policy."
            />
            <CheckBoxs
                control={control}
                setValue={setValue}
                isChecked={isAge}
                setIsChecked={setIsAge}
                errorMessage={errors.termsAccepted?.message}
                name="check_error"
                text="You must be at least 21 years old to use this service."
            />
            <View style={{ marginTop: ms(5) }}>
                <SubmitButton
                    {...{
                        text: "Register",
                        loading: false,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>

            <View style={styles.register_container}>
                <Text style={styles.register_text}>Already have account?</Text>
                <TouchableOpacity style={styles.register_button} onPress={() => Navigation.navigate("LoginScreen")}>
                    <Text style={styles.register_button_text}>Login here</Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    )
}

export default RegistrationScreen 