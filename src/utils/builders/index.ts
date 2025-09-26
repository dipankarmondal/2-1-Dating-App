import { Control } from "react-hook-form"
import { KeyboardTypeOptions } from "react-native"
import { FormStyle } from "../constant/Constant"
import { AlreadyMemberOptions, BlockUserOptions, ChooseInterst, DateTypeOptions, GoliveOptions, ModeOptions, PromotionOptions, ReferalOptions, SexualityOptions } from "../../components/common/helper"
import { From, Hours, Minutes, PrivatePartyOptions } from "../../screens/screens/stack-navigation-screens/private-party-screen/helper"

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
export const RegisterPhoneBuilder = (control: Control<any>) => {
    return [
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
            keyboardType: 'numeric' as KeyboardTypeOptions,
        },
    ]
}
export const ProfileSetupBuilder = (control: Control<any>) => {
    return [
        {
            name: 'mode',
            parent: 'profile_setup',
            type: "mode",
            label: true,
            control: control,
            placeholder: true,
            option: ModeOptions
        },
        {
            name: 'partner_sex',
            parent: 'profile_setup',
            type: "dropdown",
            label: false,
            control: control,
            placeholder: true,
            selectionData: SexualityOptions
        },
        {
            name: 'partner_dob',
            parent: 'profile_setup',
            type: "dob",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'your_sex',
            parent: 'profile_setup',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: SexualityOptions
        },
        {
            name: 'your_dob',
            parent: 'profile_setup',
            type: "dob",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'city',
            parent: 'profile_setup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'state',
            parent: 'profile_setup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'country',
            parent: 'profile_setup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'zipcode',
            parent: 'profile_setup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            keyboardType: 'numeric' as KeyboardTypeOptions,
        },
        {
            name: 'address',
            parent: 'profile_setup',
            type: "textarea",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'profile_bio',
            parent: 'profile_setup',
            type: "textarea",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'intrest',
            parent: 'profile_setup',
            type: "choose",
            label: true,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ChooseInterst
        },
        {
            name: 'file',
            parent: 'profile_setup',
            type: "file",
            styles: FormStyle,
            label: true,
            control: control,
            placeholder: true,
        },

    ]
}
export const FoegetPasswordBuilder = (control: Control<any>) => {
    return [
        {
            name: 'phone',
            parent: 'forget_password',
            type: "phone",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'otp',
            parent: 'forget_password',
            type: "text",
            label: false,
            control: control,
            styles: FormStyle,
            placeholder: true,
            keyboardType: 'numeric' as KeyboardTypeOptions,
        },
    ]
}
export const ChangePasswordBuilder = (control: Control<any>) => {
    return [
        {
            name: 'password',
            parent: 'forget_password',
            type: "password",
            label: false,
            styles: FormStyle,
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
export const BusinessSignupBuilder = (control: Control<any>) => {
    return [
        {
            name: 'first_name',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'last_name',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'email',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'phone',
            parent: 'business_signup',
            type: "phone",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'company_name',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'web_url',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: "country",
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'state',
            parent: 'business_signup',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'achieve',
            parent: 'business_signup',
            type: "multi",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            option: PromotionOptions
        },
        {
            name: 'isMember',
            parent: 'business_signup',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: AlreadyMemberOptions
        },
        {
            name: 'referal',
            parent: 'business_signup',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ReferalOptions
        },
        {
            name: 'additionalInfo',
            parent: 'business_signup',
            type: "textarea",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },

    ]
}
export const SpeedDateBuilder = (control: Control<any>) => {
    return [
        {
            name: 'date_type',
            parent: 'speed_date',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: DateTypeOptions
        },
        {
            name: 'date',
            parent: 'speed_date',
            type: "dob",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'intrest',
            parent: 'speed_date',
            type: "choose",
            label: true,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ChooseInterst
        },
        {
            name: 'country',
            parent: 'speed_date',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'details',
            parent: 'speed_date',
            type: "textarea",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
    ]
}
export const ChatroomBuilder = (control: Control<any>) => {
    return [
        {
            name: 'date_type',
            parent: 'chatroom',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: DateTypeOptions
        },
        {
            name: 'title',
            parent: 'chatroom',
            type: "text",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'block_user',
            parent: 'chatroom',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: BlockUserOptions
        },
        {
            name: 'go_live',
            parent: 'chatroom',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: GoliveOptions
        },
    ]
}
export const PrivatePartyBuilder = (control: Control<any>) => {
    return [
        {
            name: 'date',
            parent: 'private_party',
            styles: FormStyle,
            type: "dob",
            label: true,
            placeholder: true,
            control: control,
        },
        {
            name: 'start_time_hours',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: Hours,
            isDubble: true,
            _skip: null
        },
        {
            name: 'start_time_minutes',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: Minutes,
            isDubble: true,
            _skip: null
        },
        {
            name: 'end_time_hours',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: Hours,
            isDubble: true,
            _skip: null
        },
        {
            name: 'end_time_minutes',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: Minutes,
            isDubble: true,
            _skip: null
        },
        {
            name: 'intrest',
            parent: 'private_party',
            type: "choose",
            label: true,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ChooseInterst
        },
        {
            name: 'female_age_from',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'female_age_until',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'male_age_from',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'male_age_until',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'transgender_age_from',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'transgender_age_until',
            parent: 'private_party',
            styles: FormStyle,
            type: "dropdown",
            label: true,
            placeholder: true,
            control: control,
            selectionData: From,
            isDubble: true,
            _skip: null
        },
        {
            name: 'country',
            parent: 'private_party',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'event_name',
            parent: 'private_party',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'details',
            parent: 'private_party',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'incognito_party',
            parent: 'private_party',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: PrivatePartyOptions,
        },
        {
            name: 'promote_party',
            parent: 'private_party',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: PrivatePartyOptions,
        },
        {
            name: 'invite',
            parent: 'private_party',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: PrivatePartyOptions,
        },
        {
            name: 'guestlist',
            parent: 'private_party',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: PrivatePartyOptions,
        },
    ]
}
