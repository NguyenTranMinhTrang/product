import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FONTS, SIZES, COLORS } from "../constants";
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, onPress }) => {
    const { title, price, image, rating, category } = item;
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: "row",
                marginVertical: SIZES.base,
                alignItems: "center"
            }}

            onPress={() => { onPress(item) }}
        >
            <View style={{ flex: 0.35 }}>
                <Image
                    source={{ uri: image }}
                    style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "cover",
                        borderRadius: SIZES.radius
                    }}
                />
            </View>

            <View style={{ flex: 0.65, paddingHorizontal: SIZES.padding }}>
                <Text style={{ ...FONTS.h3 }}>{title}</Text>
                <Text style={{ ...FONTS.h3_light }}>{category}</Text>
                <Text style={{ ...FONTS.h3 }}>{`Price : ${price}`}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ ...FONTS.h3, marginRight: SIZES.base }}>{`Rate : ${rating.rate}`}</Text>
                    <Ionicons name="star" size={24} color={COLORS.star} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Item;