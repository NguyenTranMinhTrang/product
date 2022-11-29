import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { Item } from "../components";
// Redux
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const Product = ({ navigation }) => {

    const [list, setList] = React.useState({
        loading: false,
        products: []
    });
    const [categoryList, setCategoryList] = React.useState(null);

    const getProductList = async () => {
        setList({
            ...list,
            loading: true
        });
        const data = await axiosInstance.get("/")
            .then((response) => {
                console.log("1.1: ", new Date());
                if (response.status == 200) {
                    return {
                        code: 1,
                        data: response.data
                    };
                }
                else {
                    return {
                        code: 0,
                        data: response.data
                    };
                }
            })
            .catch((error) => {
                return {
                    code: 0,
                    data: error
                };
            });
        return data;
    }

    const getCategories = async () => {
        const data = await axiosInstance.get("/categories")
            .then((response) => {
                if (response.status == 200) {
                    return {
                        code: 1,
                        data: response.data
                    };
                }
                else {
                    return {
                        code: 0,
                        data: response.data
                    };
                }
            })
            .catch((error) => {
                return {
                    code: 0,
                    data: error
                };
            })
        return data;
    }

    React.useEffect(() => {

        /* const t0 = performance.now();
        Promise.all([getProductList(), getCategories()]).then(([productList, categoryList]) => {
            console.log("productList: ", productList);
            console.log("categoryList: ", categoryList);
            const t1 = performance.now();
            if (productList) {
                setList(productList);
            }
            if (categoryList) {
                setCategoryList(categoryList);
            }
            console.log(`Call 2 api took ${t1 - t0} milliseconds.`);
        }); */

        axios.all([getProductList(), getCategories()])
            .then(
                axios.spread((productList, categoryList) => {
                    if (productList.code == 1) {
                        setList({
                            loading: false,
                            products: productList.data
                        })
                    }
                    else {
                        Alert.alert(productList.data);
                    }

                    if (categoryList.code == 1) {
                        setCategoryList({
                            ...categoryList.data
                        })
                    }
                    else {
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

                onPress={() => navigation.navigate('AddProduct')}
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