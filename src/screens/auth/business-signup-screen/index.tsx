/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Local imports*/
import { BusinessSignupScreenStyles as styles } from './styles'
import { BusinessSignupBuilder } from '../../../utils/builders'
import { ms } from '../../../utils/helpers/responsive'

/**Components */
import AuthLayout from '../common/AuthLayout'
import CustomInput from '../../../components/form-utils/custom-input'
import SubmitButton from '../../../components/submit-button'

/** Liabary*/
import { useForm } from 'react-hook-form'
import DropdownInput from '../../../components/form-utils/dropdown-input'
import MultiselectInput from '../../../components/form-utils/multiselect-input/MultiselectInput'
import { useQuery } from '@tanstack/react-query'
import { GetAllCountries } from '../../../utils/api-calls/auth-calls/AuthCall'
import LocationInput from '../../../components/form-utils/location-input'

/**Main export*/
const BusinessSignupScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm()
    const OnSubmit = (data: any) => {
        console.log("object", data)
    };

    const {data} = useQuery({
        queryKey: ['businessSignup'],
        queryFn: () => GetAllCountries()
    })
    console.log("adfasda", data);
    
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
                } else if(item.type === 'dropdown') {
                    return <DropdownInput key={index} {...item} />
                } else if(item.type === 'multi') {
                    return <MultiselectInput key={index} {...item} />
                } 
            })}
            <View style={{ marginTop: ms(10) }}>
                <SubmitButton
                    {...{
                        text: "Login",
                        loading: false,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
        </AuthLayout>
    )
}

export default BusinessSignupScreen