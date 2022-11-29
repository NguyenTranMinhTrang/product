import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { Item } from "../components";
import { getProductList, getCategories } from "../api/productApi";
// Redux
import axios from "axios";

const Product = ({ navigation }) => {

    const [list, setList] = React.useState({
        loading: true,
        products: [],
        categoryList: []
    });

    const reFresh = async () => {
        setList({
            ...list,
            loading: true
        });
        const data = await getProductList();
        if (data && data.code == 1) {
            setList({
                ...list,
                loading: false,
                products: data.data
            })
        }
        else {
            Alert.alert(`Error: ${data.data}`);
        }
    }

    const handleScroll = async (e) => {
        if (e.nativeEvent.contentOffset.y < -5) {
            reFresh();
        }
    }

    React.useEffect(() => {
        axios.all([getProductList(), getCategories()])
            .then(
                axios.spread((productList, categoryList) => {
                    if (productList.code == 1 && categoryList.code == 1) {
                        setList({
                            loading: false,
                            products: productList.data,
                            categoryList: categoryList.data
                        })
                    }

                    if (productList.code == 0) {
                        Alert.alert(productList.data);
                    }

                    if (categoryList.code == 0) {
                        Alert.alert(categoryList.data);
                    }
                })
            )
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

                onPress={() => navigation.navigate('AddProduct', { categories: list.categoryList, reFresh: reFresh })}
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
                    list.loading ?
                        <ActivityIndicator size="large" color={COLORS.black} />
                        :
                        <FlatList
                            data={list.products}
                            keyExtractor={item => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            initialNumToRender={4}
                            windowSize={3}
                            onScroll={handleScroll}
                        />
                }
            </View>
        )
    }

    console.log("Home");
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