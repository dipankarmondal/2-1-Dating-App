/**React Imports */
import { View, Text } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ChangePasswordBuilder, FoegetPasswordBuilder } from '../../../utils/builders'
import { ms } from '../../../utils/helpers/responsive'

/**Components */
import AuthLayout from '../common/AuthLayout'
import CustomInput from '../../../components/form-utils/custom-input'
import PhoneInputForm from '../../../components/form-utils/phone-input/PhoneInput'
import SubmitButton from '../../../components/submit-button'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Main export*/
const ForgetPassword: React.FC = () => {
    const [Phone, setPhone] = useState(null);
    const [isForgetVerified, setIsForgetVerified] = useState<boolean>(false);
    const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

    // For step 1 (phone)
    const { control: ChangePasswordControl, handleSubmit: handleChangePasswordSubmit, setValue, formState: { errors }, reset } = useForm()

    // For step 1 (phone)
    const { control: ForgetControl, handleSubmit: handleForgetSubmit } = useForm();

    const OnSubmit = (data: any) => {
        console.log("object", data);
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
                                        onPress: () => setIsOtpVerified(true) // 👈 switch state
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={{ marginTop: ms(5) }}>
                                <SubmitButton
                                    {...{
                                        text: "Verify OTP",
                                        loading: false,
                                        onPress: () => setIsForgetVerified(true) // 👈 handle verify
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
                                    text: "Verify OTP",
                                    loading: false,
                                    onPress: () => console.log("Verifying OTP...") // 👈 handle verify
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