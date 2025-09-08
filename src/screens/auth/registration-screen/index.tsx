/**React Imports */
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { RegistrationScreenStyles as styles } from './styles'
import { RegisterBuilder, RegisterPhoneBuilder } from '../../../utils/builders'
import { ms, toast } from '../../../utils/helpers/responsive'
import { RegisterSchema } from '../../../utils/schemas/Schemas'
import { CreateUser, VerifayOtp, VerifayPhone } from '../../../utils/api-calls/auth-calls/AuthCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

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
import { useMutation } from '@tanstack/react-query'

/**Main export*/
const RegistrationScreen: React.FC = () => {
    const [Phone, setPhone] = useState(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isAge, setIsAge] = useState<boolean>(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
    const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

    const Navigation = useNavigation<any>()
    const { login } = useAuth();

    // For step 1 (phone)
    const { control: phoneControl, handleSubmit: handlePhoneSubmit } = useForm();

    // For step 2 (register)
    const { control: registerControl, handleSubmit: handleRegisterSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            termsAccepted: false,
            age_error: false,
        },
    });

    const PhoneVarifayMutation = useMutation({
        mutationFn: (data: any) => VerifayPhone(data),
        onSuccess: (res) => {
            console.log("object", res);
            if (res?.success === true) {
                setIsOtpVerified(true);
                toast("success", { title: res?.message });
                Alert.alert("Success", `OTP: ${res?.data?.code}`);
            }
        },
    })

    const OtpVarifayMutation = useMutation({
        mutationFn: (data: any) => VerifayOtp(data),
        onSuccess: (res) => {
            if (res?.success === true) {
                setIsPhoneVerified(true);
                toast("success", { title: res?.message });
            }
        },
    })

    const CreateUserMutation = useMutation({
        mutationFn: (data: any) => CreateUser(data),
        onSuccess: (res) => {
            if (res?.success === true) {
                login({
                    Token: res?.data?.token || null,
                    user: res?.data?.user || null,
                });
                toast("success", { title: res?.message });
            }
        },
    })


    const HanddlePhoneVarifay = (data: any) => {
        const cleanedPhone = Phone?.replace(/\s+/g, "");
        PhoneVarifayMutation.mutate({ phone: cleanedPhone });
    };
    const HanddleOtpVarifay = (data: any) => {
        const cleanedPhone = Phone?.replace(/\s+/g, "");
        const Payload = {
            target: cleanedPhone,
            type: "signup",
            code: data?.otp
        }

        OtpVarifayMutation.mutate(Payload);
    };

    const handleRegister = (data: any) => {
        const payload = {
            email: data?.email,
            password: data?.password,
            username: data?.username
        }
        CreateUserMutation.mutate(payload);
    };

    return (
        <AuthLayout
            {...{
                titile: isPhoneVerified ? "Create Member Account" : "Verify your phone number",
                isBack: true,
            }}
        >
            {
                !isPhoneVerified && (
                    <View>
                        {RegisterPhoneBuilder(phoneControl).map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item.type === 'phone') {
                                return <PhoneInputForm key={index} {...item} setPhone={setPhone} />;
                            }
                        })}
                        <View style={{ marginTop: ms(5) }}>
                            {
                                !isOtpVerified ? (
                                    <SubmitButton
                                        {...{
                                            text: "Send OTP",
                                            loading: PhoneVarifayMutation.isPending,
                                            onPress: handlePhoneSubmit(HanddlePhoneVarifay)
                                        }}
                                    />
                                ) : (
                                    <SubmitButton
                                        {...{
                                            text: "Varify OTP",
                                            loading: OtpVarifayMutation.isPending,
                                            onPress: handlePhoneSubmit(HanddleOtpVarifay)
                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>
                )
            }

            {
                isPhoneVerified && (
                    <View>
                        {RegisterBuilder(registerControl).map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item.type === 'phone') {
                                return <PhoneInputForm key={index} {...item} setPhone={setPhone} />;
                            }
                        })}
                        <CheckBoxs
                            control={registerControl}
                            setValue={setValue}
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            errorMessage={errors.termsAccepted?.message}
                            name="termsAccepted"
                            text="I agree to the Terms of Service and Privacy Policy."
                        />
                        <CheckBoxs
                            control={registerControl}
                            setValue={setValue}
                            isChecked={isAge}
                            setIsChecked={setIsAge}
                            errorMessage={errors.age_error?.message}
                            name="age_error"
                            text="You must be at least 21 years old to use this service."
                        />
                        <View style={{ marginTop: ms(5) }}>
                            <SubmitButton
                                {...{
                                    text: "Register",
                                    loading: CreateUserMutation.isPending,
                                    onPress: handleRegisterSubmit(handleRegister)
                                }}
                            />
                        </View>
                    </View>
                )
            }

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