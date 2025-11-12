import { Control } from "react-hook-form"
import { KeyboardTypeOptions } from "react-native"
import { FormStyle } from "../constant/Constant"
import { AlreadyMemberOptions, BlockUserOptions, CategoryOptions, ChooseInterst, DateTypeOptions, Distance, GoliveOptions, GroupForOptions, GroupTypeOptions, ModeOptions, PromotionOptions, ReferalOptions, SexualityOptions } from "../../components/common/helper"
import { From, Hours, Minutes, PrivatePartyOptions } from "../../screens/screens/stack-navigation-screens/private-party-screen/helper"
import { bodyHairOptions, bodyTypeOptions, createStream, ethnicOptions, experienceLevel, heightOptions, languagesOptions, looksOptions, piercingsOptions, relationshipOptions, sexualityOptions, smokingOptions, tattoosOptions, WeightOptions } from "../../components/profile-screen-content/edit-content/helper"
import { CategoriesFilter, GroupTypesFilter, SortOptionsFilter, TargetAudienceFilter } from "../../screens/screens/drawer-navigation-screens/groups-screen/helper"
import { Category, languages, PlaceTypeFilter, ReportReasons, SpeedDateUserFilter } from "../../screens/screens/drawer-navigation-screens/hot-date-screen/helper"

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
            name: 'start_date',
            parent: 'speed_date',
            type: "dob",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
        },
        {
            name: 'end_date',
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
            type: "country",
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
export const CreateGroupBuilder = (control: Control<any>) => {
    return [
        {
            name: 'group_name',
            parent: 'create_group',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'location',
            parent: 'create_group',
            styles: FormStyle,
            type: "location",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'category',
            parent: 'create_group',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: CategoryOptions
        },
        {
            name: 'group_type',
            parent: 'create_group',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: GroupTypeOptions
        },
        {
            name: 'group_for',
            parent: 'create_group',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: GroupForOptions
        },
        {
            name: 'tags',
            parent: 'create_group',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'group_desc',
            parent: 'create_group',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'rules',
            parent: 'create_group',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'file',
            parent: 'create_group',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const EditProfileBuilder = (control: Control<any>) => {
    return [
        {
            name: 'mode',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "mode",
            label: true,
            placeholder: true,
            control: control,
            option: ModeOptions
        },
        {
            name: 'looking_for',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "multichoose",
            label: true,
            placeholder: true,
            control: control,
        },
        {
            name: 'description',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'frist_name',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'last_name',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
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
            name: 'body_hair',
            parent: 'edit_profile',
            type: "multi",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            option: bodyHairOptions
        },
        {
            name: 'height',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: heightOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'weight',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: WeightOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'body_type',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: bodyTypeOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'ethnic_background',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ethnicOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'smoking',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: smokingOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'piercings',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: piercingsOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'tattoos',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: tattoosOptions,
        },
        {
            name: 'languages_spoken',
            parent: 'edit_profile',
            type: "multi",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            option: languagesOptions
        },
        {
            name: 'important',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: looksOptions,
        },
        {
            name: 'intelligence',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: looksOptions,
        },
        {
            name: 'sexuality',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: sexualityOptions,
        },
        {
            name: 'relationship_orientation',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: relationshipOptions,
        },
        {
            name: 'experience_level',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: experienceLevel,
        },
        {
            name: 'circumcised',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: piercingsOptions,
        },

        {
            name: 'partner_frist_name',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'partner_last_name',
            parent: 'edit_profile',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'partner_dob',
            parent: 'edit_profile',
            type: "dob",
            label: false,
            control: control,
            placeholder: true,
        },
        {
            name: 'partner_body_hair',
            parent: 'edit_profile',
            type: "multi",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            option: bodyHairOptions
        },
        {
            name: 'partner_height',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: heightOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'partner_weight',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: WeightOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'partner_body_type',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: bodyTypeOptions,
            isDubble: true,
            _skip: null,
            isEdit: true,
        },
        {
            name: 'partner_ethnic_background',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: ethnicOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'partner_smoking',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: smokingOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'partner_piercings',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: piercingsOptions,
            isDubble: true,
            _skip: null,
            isEdit: true
        },
        {
            name: 'partner_tattoos',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: tattoosOptions,
        },
        {
            name: 'partner_languages_spoken',
            parent: 'edit_profile',
            type: "multi",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            option: languagesOptions
        },
        {
            name: 'partner_important',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: looksOptions,
        },
        {
            name: 'partner_intelligence',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: looksOptions,
        },
        {
            name: 'partner_sexuality',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: sexualityOptions,
        },
        {
            name: 'partner_relationship_orientation',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: relationshipOptions,
        },
        {
            name: 'partner_experience_level',
            parent: 'edit_profile',
            type: "dropdown",
            label: false,
            styles: FormStyle,
            control: control,
            placeholder: true,
            selectionData: experienceLevel,
        },
    ]
}
export const UploadPhotoBuilder = (control: Control<any>) => {
    return [
        {
            name: 'profile_photo',
            parent: 'upload_photo',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const AudltPhotoBuilder = (control: Control<any>) => {
    return [
        {
            name: 'adult_photo',
            parent: 'upload_photo',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const NonAudltPhotoBuilder = (control: Control<any>) => {
    return [
        {
            name: 'non_adult_photo',
            parent: 'upload_photo',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const CreateAlbumBuilder = (control: Control<any>) => {
    return [
        {
            name: 'title',
            parent: 'create_album',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'password',
            parent: 'create_album',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const OpenAlbumBuilder = (control: Control<any>) => {
    return [
        {
            name: 'password',
            parent: 'open_album',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const AddPhotoAlbumBuilder = (control: Control<any>) => {
    return [
        {
            name: 'add_image',
            parent: 'open_album',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const AddVideoAlbumBuilder = (control: Control<any>) => {
    return [
        {
            name: 'add_video',
            parent: 'open_album',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
            isVideo: true
        },
    ]
}
export const EditAlbumTitleBuilder = (control: Control<any>) => {
    return [
        {
            name: 'title',
            parent: 'create_album',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const EditAccountBuilder = (control: Control<any>) => {
    return [
        {
            name: 'email',
            parent: 'edit_account',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'password',
            parent: 'edit_account',
            styles: FormStyle,
            type: "password",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'confirm_password',
            parent: 'edit_account',
            styles: FormStyle,
            type: "password",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const LocationContainer = (control: Control<any>) => {
    return [
        {
            name: 'current_location',
            parent: 'location',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'second_location',
            parent: 'location',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'distance',
            parent: 'location',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: Distance
        },
    ]
}
export const BugReport = (control: Control<any>) => {
    return [
        {
            name: 'comment',
            parent: 'bug_report',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'system_info',
            parent: 'bug_report',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const GroupFilter = (control: Control<any>) => {
    return [
        {
            name: 'category',
            parent: 'group_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: CategoriesFilter
        },
        {
            name: 'targetAudience',
            parent: 'group_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: TargetAudienceFilter
        },
        {
            name: 'sortBy',
            parent: 'group_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: SortOptionsFilter
        },
        {
            name: 'groupType',
            parent: 'group_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: GroupTypesFilter
        },
    ]
}
export const HotdateFilter = (control: Control<any>) => {
    return [
        {
            name: 'speed_date_type',
            parent: 'hotdate_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: SpeedDateUserFilter
        },
        {
            name: 'place_type',
            parent: 'hotdate_filter',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: PlaceTypeFilter
        },
    ]
}
export const ChatroomReport = (control: Control<any>) => {
    return [
        {
            name: 'reason',
            parent: 'chatroom_report',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: ReportReasons
        },
        {
            name: 'description',
            parent: 'chatroom_report',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}
export const SteramCreateBuilder = (control: Control<any>) => {
    return [
        {
            name: 'title',
            parent: 'create_stream',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'description',
            parent: 'create_stream',
            styles: FormStyle,
            type: "textarea",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'category',
            parent: 'create_stream',
            styles: FormStyle,
            type: "dropdown",
            label: false,
            placeholder: true,
            control: control,
            selectionData: Category
        },
        // {
        //     name: 'language',
        //     parent: 'create_stream',
        //     styles: FormStyle,
        //     type: "dropdown",
        //     label: false,
        //     placeholder: true,
        //     control: control,
        //     selectionData: languages
        // },
        {
            name: 'max_viewers',
            parent: 'create_stream',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        {
            name: 'tags',
            parent: 'create_stream',
            styles: FormStyle,
            type: "text",
            label: false,
            placeholder: true,
            control: control,
        },
        // {
        //     name: 'settings',
        //     parent: 'create_stream',
        //     styles: FormStyle,
        //     type: "multi",
        //     label: false,
        //     placeholder: true,
        //     control: control,
        //     option: createStream
        // },
        // {
        //     name: 'age_restriction',
        //     parent: 'create_stream',
        //     styles: FormStyle,
        //     type: "text",
        //     label: false,
        //     placeholder: true,
        //     control: control,
        // },
        {
            name: 'file',
            parent: 'create_stream',
            styles: FormStyle,
            type: "photo",
            label: false,
            placeholder: true,
            control: control,
        },
    ]
}

