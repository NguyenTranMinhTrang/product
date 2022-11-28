import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { Item } from "../components";
// Redux
import { useSelector } from "react-redux";
import actions from "../redux/actions";

const Product = ({ navigation }) => {

    const products = useSelector((state) => state.product);
    console.log(products);

    React.useEffect(() => {
        actions.getProduct(1000);
    }, []);

    const onPress = (item) => {
        navigation.navigate('Detail', { item });
    }

    const renderHeader = () => (
        <View
            style={{
                flex: 0.1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ ...FONTS.h2 }}>List Product</Text>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: SIZES.padding,
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.black,
                    borderRadius: SIZES.radius
                }}
            >
                <AntDesign name="plus" size={30} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    )

    const renderProduct = () => {

        const renderItem = ({ item }) => {
            return (
                <Item key={`${item.id}`} item={item} onPress={onPress} />
            )
        }

        return (
            <View style={{ flex: 0.9, marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                {
                    products.loading ?
                        <ActivityIndicator size="large" color={COLORS.black} />
                        :
                        <FlatList
                            data={products.myProducts}
                            keyExtractor={item => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            initialNumToRender={4}
                            windowSize={3}
                        />
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    paddingBottom: SIZES.padding
                }}
            >
                {renderHeader()}
                {renderProduct()}
            </View>
        </SafeAreaView>
    )
}

export default Product;