import { View, Text } from 'react-native'
import React from 'react'
import { InformationStyles as styles } from './styles'
import { benefitsData } from '../../../common/helper';
import { ms } from '../../../../utils/helpers/responsive';

type Props = {
    type: string
}

const Information: React.FC<Props> = ({ type }) => {

    const BulletPoint = ({ text }: { text: string }) => (
        <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>{text}</Text>
        </View>
    );

    const BenefitSection = ({ title, items }: { title: string; items: { id: number; text: string }[] }) => (
        <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map((item) => (
                <BulletPoint key={item.id} text={item.text} />
            ))}
        </View>
    );
    return (
        <>
            {
                type === "info" && (
                    <>
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionText}>
                                Your SDC membership offers access to both Website and iPhone / Android app.
                            </Text>
                        </View>
                        {benefitsData.map((section, index) => (
                            <BenefitSection key={index} title={section.title} items={section.items} />
                        ))}
                    </>
                )
            }
            {
                type === "speed_date" && (
                    <View>
                        <Text style={styles.sectionTitle}>Private Place</Text>
                        <Text style={styles.bulletText}>When : Mar 22, 2025</Text>
                        <Text style={styles.bulletText}>With : Prson1</Text>
                        <Text style={styles.bulletText}>Where : Cary, North Carolina 8963 mi</Text>
                        <Text style={[styles.bulletText,{marginVertical:ms(10)}]}>We are visiting NC for work every month. So all 🔥 couples and single ladies to the front!</Text>
                        <Text style={styles.bulletText}>Looking for women who love other women 😏 is a plus.</Text>
                    </View>
                )
            }
            {
                type === "travel_time" && (
                    <View>
                        <Text style={styles.bulletText}>Date: Mar 22, 2025 – Mar 22, 2025</Text>
                        <Text style={styles.bulletText}>Location: Cary, North Carolina, US</Text>
                        <Text style={styles.bulletText}>Distance: 668 – km/miles</Text>
                        <Text style={[styles.bulletText,{marginVertical:ms(10)}]}>Single ladies & sensual couples to the front! We travel here for work often! So finding regulars for a fun encounter every month would be fun! Need to catch an early morning flight so let's meet early to get some fun in 😏. In Cary & Clayton area!</Text>
                    </View>
                )
            }
        </>
    )
}

export default Information
