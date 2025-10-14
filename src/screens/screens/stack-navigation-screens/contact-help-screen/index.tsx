import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { CommonStyles } from '../../common/CommonStyle'
import Accordion from '../../../../components/accordion/Accordion'
import { Colors, Fonts } from '../../../../utils/constant/Constant'
import { ms } from '../../../../utils/helpers/responsive'

const ContactAndHelpScreen: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggleAccordion = (index: number) => {
        setExpandedIndex(currentIndex => (currentIndex === index ? null : index));
    };

    return (
        <ScreenLayout type="stack" title="Contact and Help">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    {
                        FAQs.map((faq: any, index: number) => {
                            return (
                                <Accordion
                                    key={index}
                                    title={faq.question}
                                    isExpanded={expandedIndex === faq.id}
                                    onToggle={() => handleToggleAccordion(faq.id)}
                                >
                                    <Text style={styles.rn_expand_text}>{faq.answer}</Text>
                                </Accordion>
                            )
                        })
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default ContactAndHelpScreen

const styles = StyleSheet.create({
    rn_expand_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(15),
        color: Colors.dt_white
    },
})


const FAQs = [
    {
        id: 1,
        question: "How can I reset my password?",
        answer: "You can reset your password from the Settings screen under 'Account'."
    },
    {
        id: 2,
        question: "How do I contact customer support?",
        answer: "You can contact customer support via the Help section or email us at support@example.com."
    },
    {
        id: 3,
        question: "Can I change my subscription plan?",
        answer: "Yes, you can change your subscription plan anytime from the Billing section."
    },
    {
        id: 4,
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption to protect all user data."
    }
];
