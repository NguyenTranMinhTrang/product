import React from "react";
import { View, Text } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const Combobox = ({ category, setFieldValue }) => {

    const categories = useSelector((state) => state.product.categories);

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: SIZES.base
            }}
        >
            <Text style={{ ...FONTS.h3 }}>Category :</Text>
            <SelectList
                data={categories}
                boxStyles={{
                    marginLeft: SIZES.base,
                    backgroundColor: COLORS.black,
                    width: SIZES.width * 0.6
                }}
                search={false}
                placeholder={category}
                dropdownTextStyles={{
                    ...FONTS.h3_light,
                    color: COLORS.black
                }}
                inputStyles={{
                    ...FONTS.h3,
                    color: COLORS.white
                }}
                save="value"
                setSelected={(val) => setFieldValue("category", val)}
            />
        </View>
    )
}

export default Combobox;