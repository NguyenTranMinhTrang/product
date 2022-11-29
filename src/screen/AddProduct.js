import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Formik, FastField } from "formik";
import debounce from "lodash.debounce";
import * as yup from "yup";
import { SIZES, COLORS, FONTS } from "../constants";
import { InputField, ModalCamera, Combobox } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { postProduct } from "../api/productApi";

const AddProduct = ({ navigation, route }) => {

    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const categories = route.params.categories;

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

    const handleCancel = () => {
        navigation.goBack();
        route.params.reFresh();
    }

    const handleAddProduct = async (values) => {
        setLoading(true);
        const data = await postProduct(values);
        setLoading(false);
        if (data.code == 1) {
            formik.current.resetForm();
            Alert.alert("Sucess", "Do you want to continue ?",
                [
                    { text: 'Cancel', onPress: handleCancel },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );

        }
        else {
            Alert.alert(data.data);
        }
    }

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
                    onSubmit={handleAddProduct}
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

                                    <Combobox categories={categories} category={values.category} setFieldValue={setFieldValue} />

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
                                                loading ?
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

export default AddProduct;