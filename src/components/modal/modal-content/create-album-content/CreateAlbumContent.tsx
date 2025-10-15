/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Local imports*/
import { CreateAlbumContentStyles as styles } from './styles'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Components */
import CustomInput from '../../../form-utils/custom-input'
import { CreateAlbumBuilder } from '../../../../utils/builders'
import SubmitButton from '../../../submit-button'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateAlbum } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { toast } from '../../../../utils/helpers/responsive'

type Props = {
    setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}
/**Main export*/
const CreateAlbumContent: React.FC<Props> = ({setShowCreateModal}) => {
    const { control, handleSubmit, reset } = useForm()
    const {Token} = useAuth()
    const QueryInvalidater = useQueryClient();

    const CreateAlbumsMutation = useMutation({
        mutationFn: (data:any) => CreateAlbum(Token, data),
        onSuccess: (res) => {
            console.log("object", res)
            if(res?.success === true) {
                toast("success", { title: res?.message });
                reset()
                setShowCreateModal(false)
                QueryInvalidater.invalidateQueries({ queryKey: ['albums'] });
            }
        }
    })

    const OnSubmit = (data: any) => {
        const payload = {
            name: data?.title,
            ...(data?.password && { password: data?.password }),
            isPrivate: data?.password?.length > 0
        }
        CreateAlbumsMutation.mutate(payload)
    }
    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_text}>Your album will be open to all users. To make it private simply add a password.</Text>
            <View style={styles.dt_input_container}>
                {CreateAlbumBuilder(control).map((item, index) => {
                    if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                        return <CustomInput key={index} {...item} />;
                    } else {
                        return null;
                    }
                })}
                <SubmitButton
                    {...{
                        text: "Create album",
                        loading: CreateAlbumsMutation.isPending,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
        </View>
    )
}

export default CreateAlbumContent