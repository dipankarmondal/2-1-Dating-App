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