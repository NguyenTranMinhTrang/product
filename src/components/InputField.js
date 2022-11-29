import React from "react";
import { View, Text, TextInput } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const InputField = ({ field, title, meta }) => {
    const { error, touched } = meta;

    return (
        <View
            style={{
                marginVertical: SIZES.base
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{title}</Text>
                <TextInput
                    numberOfLines={4}
                    style={{
                        borderColor: COLORS.white,
                        marginLeft: SIZES.base,
                        flex: 1,
                        borderWidth: 1,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.black,
                        color: COLORS.white,
                        height: 70,
                        textAlignVertical: "center",
                        padding: SIZES.base * 2,
                        ...FONTS.h3,
                    }}
                    value={`${field.value}`}
                    onChangeText={(text) => field.onChange(field.name)(text)}
                    onBlur={field.onBlur(field.name)}
                />
            </View>
            {
                error && touched &&
                <Text style={{ ...FONTS.h3_light, color: "red", marginTop: SIZES.base }}>{error}</Text>
            }
        </View>
    )
}

export default InputField;