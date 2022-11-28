import React from "react";
import { View, Text, TextInput } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";

const InputField = ({ field, title, style }) => {
    let numOfLines = 1;
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
                    multiline={true}
                    numberOfLines={1}

                    style={{
                        borderColor: COLORS.white,
                        marginLeft: SIZES.base,
                        flex: 1,
                        borderWidth: 1,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.black,
                        padding: SIZES.base * 2,
                        color: COLORS.white,
                        overflow: "hidden",
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: 'auto',
                        ...FONTS.h3
                    }}
                    value={`${field.value}`}
                    onChangeText={(text) => field.onChange(field.name)(text)}
                    onBlur={field.onBlur(field.name)}
                />
            </View>
        </View>
    )
}

export default InputField;