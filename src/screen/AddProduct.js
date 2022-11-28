import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Formik, FastField } from "formik";
import debounce from "lodash.debounce";
import * as yup from "yup";
import { SIZES, COLORS, FONTS } from "../constants";
import { InputField, ModalCamera, Combobox } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import actions from "../redux/actions";
import { useSelector } from "react-redux";

const AddProduct = ({ navigation }) => {

    const [show, setShow] = React.useState(false);
    const product = useSelector((state) => state.product);

    console.log(product.categories);

    const formik = React.useRef();

    React.useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    const validate = yup.object().shape({
        image: yup.string().required("Image is required !"),
        title: yup.string().required("Title is required !"),
        category: yup.string().required("Category is required !"),
        description: yup.string().required("Description is required !"),
        price: yup.number().typeError("You must specify a number").min(0, "Min value 0")
    });

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: SIZES.base * 2
                }}
            >
                <Text style={{ ...FONTS.h2 }}>Add Product</Text>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: SIZES.padding,
                        top: 15,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.black
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            {renderHeader()}
            <KeyboardAwareScrollView>
                <Formik
                    innerRef={formik}
                    enableReinitialize={true}
                    validationSchema={validate}
                    validateOnChange={false}
                    initialValues={{
                        title: "",
                        price: "",
                        description: "",
                        image: "",
                        category: "electronic"
                    }}
                    onSubmit={async (values) => {
                        console.log(values);
                        const isSuccess = await actions.postProduct(values);
                        if (isSuccess) {
                            formik.current.resetForm();
                        }
                        else {
                            Alert.alert(product.error);
                        }
                    }}
                >
                    {({ setFieldValue, values, handleSubmit }) => {
                        return (
                            <ScrollView style={{ flex: 1 }}>
                                <ModalCamera show={show} setShow={setShow} setImage={setFieldValue} />
                                <View
                                    style={{
                                        padding: SIZES.padding
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: SIZES.base
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h3, marginRight: SIZES.base }}>Image: </Text>

                                        {
                                            values.image &&
                                            <Image
                                                source={{ uri: values.image }}
                                                style={{
                                                    height: 120,
                                                    flex: 1,
                                                    marginRight: SIZES.padding,
                                                    borderRadius: SIZES.radius
                                                }}
                                                resizeMode="cover"
                                            />
                                        }
                                        <TouchableOpacity
                                            style={{
                                                height: 55,
                                                width: 55,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 25,
                                                backgroundColor: COLORS.black
                                            }}

                                            onPress={() => setShow(true)}
                                        >
                                            <Ionicons name="ios-camera-sharp" size={30} color={COLORS.white} />
                                        </TouchableOpacity>

                                    </View>
                                    {/* title */}
                                    <FastField
                                        name="title"
                                    >
                                        {(props) => (
                                            <InputField title="Title: " {...props} />
                                        )}
                                    </FastField>

                                    {/* category */}

                                    <Combobox category={values.category} setFieldValue={setFieldValue} />

                                    {/* description */}
                                    <FastField
                                        name="description"
                                    >
                                        {(props) => (
                                            <InputField title="Description: " {...props} />
                                        )}
                                    </FastField>

                                    {/* price */}
                                    <FastField
                                        name="price"
                                    >
                                        {(props) => (
                                            <InputField title="Price: " {...props} />
                                        )}
                                    </FastField>

                                    <View
                                        style={{ alignItems: "center", marginTop: SIZES.padding }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: "90%",
                                                backgroundColor: COLORS.black,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: SIZES.radius,
                                                paddingVertical: SIZES.base * 2
                                            }}
                                            onPress={handleSubmit}
                                        >
                                            {
                                                product.loading ?
                                                    <ActivityIndicator size="large" color={COLORS.white} />
                                                    :
                                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        )
                    }}
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default AddProduct;