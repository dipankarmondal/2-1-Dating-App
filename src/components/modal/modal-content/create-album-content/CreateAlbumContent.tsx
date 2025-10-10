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

/**Main export*/
const CreateAlbumContent: React.FC = () => {
    const { control, handleSubmit, setValue } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data)
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
                        loading: false,
                        onPress: handleSubmit(OnSubmit)
                    }}
                />
            </View>
        </View>
    )
}

export default CreateAlbumContent