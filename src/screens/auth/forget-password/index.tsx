/**React Imports */
import { View,Alert } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ChangePasswordBuilder, FoegetPasswordBuilder } from '../../../utils/builders'
import { ms, toast } from '../../../utils/helpers/responsive'
import { ForgotPasswordRequest, ResetPassword, VerifyResetOtp } from '../../../utils/api-calls/auth-calls/AuthCall'

/**Components */
import AuthLayout from '../common/AuthLayout'
import CustomInput from '../../../components/form-utils/custom-input'
import PhoneInputForm from '../../../components/form-utils/phone-input/PhoneInput'
import SubmitButton from '../../../components/submit-button'

/** Liabary*/
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const ForgetPassword: React.FC = () => {
    const [Phone, setPhone] = useState(null);
    const [isForgetVerified, setIsForgetVerified] = useState<boolean>(false);
    const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
    const [ResetToken, SetResetToken] = useState(null);

    const Navigation = useNavigation<any>()

    // For step 1 (phone)
    const { control: ChangePasswordControl, handleSubmit: handleChangePasswordSubmit, setValue, formState: { errors }, reset } = useForm()

    // For step 1 (phone)
    const { control: ForgetControl, handleSubmit: handleForgetSubmit } = useForm();

    const UserForgetRequest = useMutation({
        mutationFn: (data: any) => ForgotPasswordRequest(data),
        onSuccess: (res) => {
            if (res?.success === true) {
                setIsOtpVerified(true)
                Alert.alert("Success", `OTP: ${res?.data?.otpCode}`);
            }
        }
    })

    const UserVerifayOtp = useMutation({
        mutationFn: (data: any) => VerifyResetOtp(data),
        onSuccess: (res) => {
            if (res?.success === true) {
                SetResetToken(res?.data?.resetToken);
                setIsForgetVerified(true);
                toast("success", { title: res?.message });
            }
        }
    })

    const OnForgetPassword = useMutation({
        mutationFn: (data: any) => ResetPassword(data),
        onSuccess: (res) => {
            if (res?.success === true) {
                Navigation.navigate("LoginScreen");
                toast("success", { title: res?.message });
            }
        }
    })

    const OnForgetRequestSend = (data: any) => {
        const cleanedPhone = Phone?.replace(/\s+/g, "");
        const payload = {
            identifier: cleanedPhone,
            type: "phone"
        }
        UserForgetRequest.mutate(payload);
    };

    const OnPasswordVarifay = (data: any) => {
        const cleanedPhone = Phone?.replace(/\s+/g, "");
        const payload = {
            identifier: cleanedPhone,
            type: "phone",
            otp: data?.otp
        }
        UserVerifayOtp.mutate(payload);
    };

    const OnChangePassword = (data: any) => {
        const payload = {
            resetToken: ResetToken,
            newPassword: data?.password,
            confirmPassword: data?.confirm_password
        }
        OnForgetPassword.mutate(payload);
    };

    return (
        <AuthLayout
            {...{
                titile: !isForgetVerified ? "Verify your OTP" : "Forget your password", // 👈 change title
                isBack: true,
            }}
        >
            {
                !isForgetVerified && (
                    <View>
                        {FoegetPasswordBuilder(ChangePasswordControl).map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item.type === 'phone') {
                                return <PhoneInputForm key={index} {...item} setPhone={setPhone} />
                            }
                        })}

                        {!isOtpVerified ? (
                            <View style={{ marginTop: ms(5) }}>
                                <SubmitButton
                                    {...{
                                        text: "Send OTP",
                                        loading: false,
                                        onPress: handleChangePasswordSubmit(OnForgetRequestSend)// 👈 switch state
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={{ marginTop: ms(5) }}>
                                <SubmitButton
                                    {...{
                                        text: "Verify OTP",
                                        loading: false,
                                        onPress: handleChangePasswordSubmit(OnPasswordVarifay) // 👈 handle verify
                                    }}
                                />
                            </View>
                        )}
                    </View>
                )
            }

            {
                isForgetVerified && (
                    <View>
                        {ChangePasswordBuilder(ForgetControl).map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            }
                        })}

                        <View style={{ marginTop: ms(5) }}>
                            <SubmitButton
                                {...{
                                    text: "Reset Password",
                                    loading: false,
                                    onPress: handleForgetSubmit(OnChangePassword)
                                }}
                            />
                        </View>
                    </View>
                )
            }

        </AuthLayout>
    )
}

export default ForgetPassword;

//7439423955