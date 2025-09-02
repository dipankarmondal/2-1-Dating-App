import * as yup from 'yup'
import FormFields from '../models/FormFields.json'

export const LoginSchema = yup.object().shape({
    username: yup
        .string()
        .required(FormFields.login.username.errors.required)
        .min(3, FormFields.create_account.username.errors.min),
    password: yup
        .string()
        .required(FormFields.login.password.errors.required)
        .matches(
            new RegExp(FormFields.login.password.errors.pattern.value),
            FormFields.login.password.errors.pattern.message
        ),
});
export const RegisterSchema = yup.object().shape({
    username: yup
        .string()
        .required(FormFields.create_account.username.errors.required)
        .min(3, FormFields.create_account.username.errors.min),
    email: yup
        .string()
        .required(FormFields.create_account.email.errors.required),
    phone: yup
        .string()
        .required(FormFields.create_account.phone.errors.required),
    password: yup
        .string()
        .required(FormFields.create_account.password.errors.required)
        .matches(
            new RegExp(FormFields.create_account.password.errors.pattern.value),
            FormFields.create_account.password.errors.pattern.message
        ),
    confirm_password: yup
        .string()
        .required(FormFields.create_account.confirm_password.errors.required)
        .oneOf(
            [yup.ref('password'), null],
            FormFields.create_account.confirm_password.errors.match
        ),
    otp: yup
        .string()
        .required(FormFields.create_account.otp.errors.required),
    termsAccepted: yup
        .boolean()
        .oneOf([true], 'you must accept the terms and conditions'),
    age_error: yup
        .boolean()
        .oneOf([true], "you must be at least 21 years old to register"),

});
