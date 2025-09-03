/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'

/**Local imports*/
import { LoginScreenStyles as styles } from './styles'
import AuthLayout from '../common/AuthLayout'
import { LoginForm } from '../../../utils/types/types'
import { LoginBuilder } from '../../../utils/builders'
import { ms, toast } from '../../../utils/helpers/responsive'
import { LoginSchema } from '../../../utils/schemas/Schemas'

/** Liabary*/
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

/**Components */
import CustomInput from '../../../components/form-utils/custom-input'
import SubmitButton from '../../../components/submit-button'
import CaptchaBox, { CaptchaBoxRef } from '../../../components/captcha-box/CaptchaBox'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { LoginUser } from '../../../utils/api-calls/auth-calls/AuthCall'

/**Main export*/
const LoginScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<LoginForm>({
        resolver: yupResolver(LoginSchema),
    })
    const captchaRef = useRef<CaptchaBoxRef>(null);
    const { login } = useAuth();

    const Navigation = useNavigation<any>()

    const LoginMutation = useMutation({
        mutationFn: (data: any) => LoginUser(data),
        onSuccess: (res) => {
            console.log("object", res);
            if (res?.success === true) {
                login({
                    Token: res?.data?.token || null,
                    user: res?.data?.user || null,
                });
                toast("success", { title: res?.message });
            }
        }
    })

    const OnSubmit = (data: LoginForm) => {
        const isCaptchaValid = captchaRef.current?.validate();
        if (!isCaptchaValid) {
            console.log("❌ Captcha incorrect");
            captchaRef.current?.reset();
            return;
        }

        const payload = {
            identifier: data?.username,
            password: data?.password
        }

        LoginMutation.mutate(payload);
    };

    useEffect(() => {
       setValue("username", "pdas123");
       setValue("password", "Pdas123@");
    }, []);

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
                        loading: LoginMutation.isPending,
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