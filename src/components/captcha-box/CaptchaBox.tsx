import { View, Text, TextInput } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CaptchaBoxstyles as styles } from './styles'

type Operator = "+" | "-" | "*";

export interface CaptchaBoxRef {
    validate: () => boolean;
    reset: () => void;
}

const CaptchaBox = forwardRef<CaptchaBoxRef>((_, ref) => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [operator, setOperator] = useState<Operator>("+");
    const [answer, setAnswer] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = (): void => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        const operators: Operator[] = ["+", "-", "*"];
        const randomOp = operators[Math.floor(Math.random() * operators.length)];

        setNum1(n1);
        setNum2(n2);
        setOperator(randomOp);
        setAnswer("");
    };

    const getCorrectAnswer = (): number => {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            default:
                return 0;
        }
    };

    // expose methods to parent
    useImperativeHandle(ref, () => ({
        validate: () => {
            const correct = getCorrectAnswer();
            if (parseInt(answer, 10) === correct) {
                setError(""); // clear error
                return true;
            } else {
                setError("❌ Wrong answer, try again");
                return false;
            }
        },
        reset: () => generateCaptcha(),
    }));

    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.captchaContainer}>
                <View style={styles.captchaBox}>
                    <Text style={styles.captchaText}>
                        {num1} {operator} {num2}
                    </Text>
                </View>
                <Text style={styles.equals}>=</Text>
                <TextInput
                    style={styles.captchaInput}
                    value={answer}
                    onChangeText={setAnswer}
                    keyboardType="numeric"
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
});

export default CaptchaBox