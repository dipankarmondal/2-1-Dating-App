import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { BugReportScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { CommonStyles } from '../../common/CommonStyle'
import { useForm } from 'react-hook-form'
import { BugReport } from '../../../../utils/builders'
import CustomInput from '../../../../components/form-utils/custom-input'
import SubmitButton from '../../../../components/submit-button'
import { ms } from '../../../../utils/helpers/responsive'
import DeviceInfo from 'react-native-device-info';

const BugReportScreen: React.FC = () => {
    const { control, handleSubmit, setValue, } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data)
    }

    useEffect(() => {
        const setSystemInfo = async () => {
            const os = DeviceInfo.getSystemName(); // e.g., iOS, Android
            const osVersion = DeviceInfo.getSystemVersion(); // e.g., 16.4
            const device = DeviceInfo.getDeviceNameSync(); // e.g., iPhone 14

            // Screen resolution
            const { width, height } = Dimensions.get("window");
            const screen_resolution = `${width} x ${height}`;

            const browser = "React Native App"; // Mobile app won't have a browser, so name it app
            const browserVersion = DeviceInfo.getVersion(); // App version

            const systemInfo = {
                os,
                osVersion,
                browser,
                browserVersion,
                screen_resolution,
                device,
            };

            setValue("system_info", JSON.stringify(systemInfo));
        };

        setSystemInfo();
    }, []);

    return (
        <ScreenLayout type="stack" title="Bug Report">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    <View>
                        <Text style={styles.dt_content_header_text}>Bug Report</Text>
                        <Text style={styles.dt_content_header_subtext}>Please be as detailed as possible providing information like device, operating system, browser, internet connection (WiFi/mobile) and upload a screenshot of the issue if possible. Thank you.</Text>
                    </View>
                    {BugReport(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                            return <CustomInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Submit",
                                loading: false,
                                onPress: handleSubmit(OnSubmit)
                            }}
                        />
                    </View>
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default BugReportScreen