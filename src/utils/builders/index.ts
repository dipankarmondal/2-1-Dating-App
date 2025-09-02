import { Control } from "react-hook-form"
import { KeyboardTypeOptions } from "react-native"
import { FormStyle } from "../constant/Constant"

export const LoginBuilder = (control: Control<any>) => {
    return [
        {
            name: 'username',
            parent: 'login',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'password',
            parent: 'login',
            styles: FormStyle,
            type: "password",
            label: false,
            control: control,
            placeholder: true,
        },
    ]
}
export const RegisterBuilder = (control: Control<any>) => {
    return [
        {
            name: 'username',
            parent: 'create_account',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'email',
            parent: 'create_account',
            styles: FormStyle,
            type: "text",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'phone',
            parent: 'create_account',
            type: "phone",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'otp',
            parent: 'create_account',
            styles: FormStyle,
            type: "text",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'password',
            parent: 'create_account',
            styles: FormStyle,
            type: "password",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'confirm_password',
            parent: 'create_account',
            styles: FormStyle,
            type: "password",
            label: false,
            control: control,
            placeholder: true,
        },
    ]
}