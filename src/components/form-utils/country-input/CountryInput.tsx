/**React Imports */
import { View, Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import Formfields from '../../../utils/models/FormFields.json';
import { CountryInputProps } from '../../../utils/types/types';
import { ms } from '../../../utils/helpers/responsive';
import { CountryInputStyles as styles } from './styles'
import { Colors } from '../../../utils/constant/Constant';

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Main export*/
const CountryInput: React.FC<CountryInputProps> = ({ name, parent, control, label }) => {
    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // 🔍 Fetch location suggestions
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchLocations = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
                    {
                        headers: {
                            "User-Agent": "secondaid_doctor/1.0 (contact@secondaid.com)",
                            "Accept-Language": "en",
                        },
                    }
                );

                if (!response.ok) throw new Error(`Request failed: ${response.status}`);

                const data = await response.json();
                setSuggestions(data || []);
            } catch (err) {
                console.error("Error fetching locations:", err);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchLocations, 600);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={{ marginBottom: ms(15), position: "relative" }}>
                    {/* Label */}
                    {label && <Text style={styles.dt_select_label}>{FieldName?.label}</Text>}

                    {/* Input */}
                    <View style={styles.dt_select_input_wrapper}>
                        <TextInput
                            style={styles.dt_select_input}
                            placeholder={FieldName?.placeholder || "Search country or city"}
                            placeholderTextColor={Colors.dt_gray + "BD"}
                            value={typeof value === 'string' ? value : value?.name || query}
                            onChangeText={(text) => {
                                setQuery(text);
                                onChange(text);
                            }}
                        />
                    </View>

                    {/* Loading */}
                    {loading && <ActivityIndicator size="small" color={Colors.dt_white} style={{ marginTop: ms(5) }} />}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <View style={styles.suggestion_container}>
                            <FlatList
                                keyboardShouldPersistTaps="handled"
                                data={suggestions}
                                keyExtractor={(item) => item.place_id.toString()}
                                renderItem={({ item }) => {
                                    const city = item.address?.city || item.name;
                                    const displayParts = item.display_name?.split(",") || [];
                                    const country = item.address?.country || displayParts[displayParts.length - 1]?.trim() || "";

                                    return (
                                        <TouchableOpacity
                                            style={styles.suggestion_item}
                                            onPress={() => {
                                                onChange({
                                                    name: item.display_name,
                                                    city,
                                                    country,
                                                    lat: item.lat,
                                                    lon: item.lon,
                                                });
                                                setQuery(item.display_name);
                                                setSuggestions([]);
                                            }}
                                        >
                                            <Text numberOfLines={1}>{item.display_name}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    )}
                </View>
            )}
        />
    );
};

export default CountryInput;