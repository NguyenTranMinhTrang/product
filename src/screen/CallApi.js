import React, { forwardRef, useImperativeHandle } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import actions from "../redux/actions"
import { useSelector } from "react-redux";


const Button = ({ title, callApi }) => {
    return (
        <TouchableOpacity
            style={{
                height: 60,
                width: 150,
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                marginBottom: 24
            }}

            onPress={callApi}
        >
            <Text style={{ color: "white" }}>{title}</Text>
        </TouchableOpacity>
    )
}

const CallApi = forwardRef((props, ref) => {
    const products = useSelector((state) => state.product);
    console.log('products', products);

    const onGetProduct = () => {
        actions.getProduct(5);
    };

    const onPostProduct = () => {
        actions.postProduct({
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        })
    };

    const onUpdateProduct = () => {
        actions.updateProduct(7, {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        })
    };

    const onEditProduct = () => {
        actions.deleteProduct(6)
    };


    const child = () => {
        console.log("Function from child");
    }

    useImperativeHandle(ref, () => ({
        child: () => {
            child();
        }
    }));


    return (
        <View style={styles.container} >
            <Button title={"Get Product"} callApi={onGetProduct} />
            <Button title={"Post Product"} callApi={onPostProduct} />
            <Button title={"Update Product"} callApi={onUpdateProduct} />
            <Button title={"Delete Product"} callApi={onEditProduct} />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CallApi;