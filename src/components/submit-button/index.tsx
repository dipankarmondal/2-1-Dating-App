/**React Imports */
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

/**Local imports*/
import { SubmitButtonStyles as styles } from './styles'
import { SubmitButtonProps } from '../../utils/types/types'

/**Main export*/
const SubmitButton: React.FC<SubmitButtonProps> = ({ text, loading, onPress }) => {
    return (
        <TouchableOpacity style={styles.dt_button} onPress={onPress} disabled={loading}>
            {
                loading ? <ActivityIndicator size="small" color="#fff" />
                    :
                    <Text style={styles.dt_button_text}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

export default SubmitButton