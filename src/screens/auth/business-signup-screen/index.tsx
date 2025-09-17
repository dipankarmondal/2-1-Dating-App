/**React Imports */
import { View, Text } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { BusinessSignupBuilder } from '../../../utils/builders'
import { ms, toast } from '../../../utils/helpers/responsive'
import DropdownInput from '../../../components/form-utils/dropdown-input'
import MultiselectInput from '../../../components/form-utils/multiselect-input/MultiselectInput'

/**Components */
import AuthLayout from '../common/AuthLayout'
import CustomInput from '../../../components/form-utils/custom-input'
import SubmitButton from '../../../components/submit-button'

/** Liabary*/
import { useForm } from 'react-hook-form'
import { PromotionOptions } from '../../../components/common/helper'
import { useMutation } from '@tanstack/react-query'
import { BusinessRequest } from '../../../utils/api-calls/auth-calls/AuthCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import PhoneInputForm from '../../../components/form-utils/phone-input/PhoneInput'

/**Main export*/
const BusinessSignupScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm()
    const { Token } = useAuth()
    const [Phone, setPhone] = useState(null);


    const BusinessRequestMutation = useMutation({
        mutationFn: (data: any) => BusinessRequest(Token, data),
        onSuccess: (res) => {
            console.log("object", res);
            if (res?.success === true) {
                toast("success", { title: res?.message });
            }
        }
    })

    const OnSubmit = (data: any) => {

        const AchieveSelect = PromotionOptions.reduce((acc, option) => {
            // turn the value into a camelCase key
            const key = option.value
                .replace(/[^a-zA-Z0-9 ]/g, "")   // remove special chars like "/"
                .replace(/\s+/g, " ")            // normalize spaces
                .split(" ")                      // split into words
                .map((w, i) =>
                    i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                )
                .join(""); // => e.g. "Promote events / parties" → "promoteEventsParties"

            acc[key] = data.achieve?.includes(option.value) || false;
            return acc;
        }, {} as Record<string, boolean>);
        const cleanedPhone = Phone?.replace(/\s+/g, "");

        const Payload = {
            firstName: data?.first_name,
            lastName: data?.last_name,
            email: data?.email,
            phoneNumber: cleanedPhone,
            companyName: data?.company_name,
            webUrl: data?.web_url,
            location: {
                country: data?.country,
                state: data?.state,
            },
            isMember: data?.isMember,
            goals: {
                promoteEvents: AchieveSelect?.promoteEventsParties,
                buildAudience: AchieveSelect?.buildAnAudienceCommunity,
                promoteClub: AchieveSelect?.promoteYourClub,
                promoteBnbHotel: AchieveSelect?.promoteYourBnbHotelResort,
                sellProduct: AchieveSelect?.sellAProductService,
                paidAdvertising: AchieveSelect?.interestInPaidAdvertising,
            },
            referralSource: data?.referal,
            additionalInfo: data?.additionalInfo,
        }
        BusinessRequestMutation.mutate(Payload);
    };



    return (
        <AuthLayout
            {...{
                titile: "REQUEST YOUR 2+1 BUSINESS PROFILE!",
                isSubtext: true,
                isBack: true
            }}
        >
            {BusinessSignupBuilder(control).map((item, index) => {
                if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                    return <CustomInput key={index} {...item} />;
                } else if (item.type === 'dropdown') {
                    return <DropdownInput key={index} {...item} />
                } else if (item.type === 'multi') {
                    return <MultiselectInput key={index} {...item} />
                } else if (item.type === 'phone') {
                    return <PhoneInputForm key={index} {...item} setPhone={setPhone} />
                }
            })}
            <View style={{ marginTop: ms(10) }}>
                <SubmitButton
                    {...{
                        text: "Request your 2+1 business profile!",
                        loading: BusinessRequestMutation.isPending,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
        </AuthLayout>
    )
}

export default BusinessSignupScreen