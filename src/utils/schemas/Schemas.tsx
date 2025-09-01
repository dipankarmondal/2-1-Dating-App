import * as yup from 'yup'
import FormFields from '../models/FormFields.json'

export const LoginSchema = yup.object().shape({
    username: yup
        .string()
        .required(FormFields.login.username.errors.required),
    password: yup
        .string()
        .required(FormFields.login.password.errors.required)
        .matches(
            new RegExp(FormFields.login.password.errors.pattern.value),
            FormFields.login.password.errors.pattern.message
        ),
});
