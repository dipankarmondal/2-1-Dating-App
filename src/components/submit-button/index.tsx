/**React Imports */
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

/**Local imports*/
import { SubmitButtonStyles as styles } from './styles'
import { SubmitButtonProps } from '../../utils/types/types'
import LoaderKitView from 'react-native-loader-kit'
import { Colors } from '../../utils/constant/Constant'

/**Main export*/
const SubmitButton: React.FC<SubmitButtonProps> = ({ text, loading, onPress, type }) => {
    return (
        <TouchableOpacity
            style={[styles.dt_button, { backgroundColor: type === "delete" ? Colors.dt_error : Colors.dt_primary_green }]}
            onPress={onPress} disabled={loading}
        >
            {
                loading ?
                    <LoaderKitView
                        style={{ width: 35, height: 35 }}
                        name={'BallScaleMultiple'}
                        animationSpeedMultiplier={1.0}
                        color={Colors.dt_bg}
                    />
                    :
                    <Text style={styles.dt_button_text}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

export default SubmitButton