import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { LoginScreenStyles as styles } from './styles'
import AuthLayout from '../common/AuthLayout'
import { useForm } from 'react-hook-form'
import { LoginForm } from '../../../utils/types/types'
import { LoginBuilder } from '../../../utils/builders'
import CustomInput from '../../../components/form-utils/custom-input'
import SubmitButton from '../../../components/submit-button'
import CaptchaBox, { CaptchaBoxRef } from '../../../components/captcha-box/CaptchaBox'
import { ms } from '../../../utils/helpers/responsive'
import { LoginSchema } from '../../../utils/schemas/Schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

const LoginScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<LoginForm>({
        resolver: yupResolver(LoginSchema),
    })
    const captchaRef = useRef<CaptchaBoxRef>(null);

    const Navigation = useNavigation<any>()

    const OnSubmit = (data: LoginForm) => {
        const isCaptchaValid = captchaRef.current?.validate();
        if (!isCaptchaValid) {
            console.log("❌ Captcha incorrect");
            captchaRef.current?.reset();
            return;
        }

        console.log("✅ Form Data:", data);
    };

    return (
        <AuthLayout
            {...{
                titile: "Member Login"
            }}
        >
            {LoginBuilder(control).map((item, index) => {
                if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                    return <CustomInput key={index} {...item} />;
                } else {
                    return null;
                }
            })}
            <View style={styles.dt_content_container}>
                <Text style={styles.dt_content_text}>Password is case sensitive.</Text>
                <Text style={styles.dt_content_subtext}>In case of error, type lowercase only.</Text>
            </View>

            <CaptchaBox ref={captchaRef} />
            <TouchableOpacity style={styles.forgot_password_container}>
                <Text style={styles.forgot_password}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{ marginTop: ms(10) }}>
                <SubmitButton
                    {...{
                        text: "Login",
                        loading: false,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
            <View style={styles.register_container}>
                <Text style={styles.register_text}>Not a member?</Text>
                <TouchableOpacity style={styles.register_button} onPress={() => Navigation.navigate("RegistrationScreen")}>
                    <Text style={styles.register_button_text}>Join now free</Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    )
}

export default LoginScreen