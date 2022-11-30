import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Formik, FastField } from "formik";
import debounce from "lodash.debounce";
import * as yup from "yup";
import { SIZES, COLORS, FONTS } from "../constants";
import { InputField, ModalCamera } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Detail = ({ navigation, route }) => {
    const [show, setShow] = React.useState(false);

    const formik = React.useRef();

    React.useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik]
    );

    const validate = yup.object().shape({
        title: yup.string().required("Title is required !"),
        category: yup.string().required("Category is required !"),
        description: yup.string().required("Description is required !"),
        price: yup.number().typeError("You must specify a number").min(0, "Min value 0")
    });

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <KeyboardAwareScrollView>
                <Formik
                    innerRef={formik}
                    enableReinitialize={true}
                    validationSchema={validate}
                    validateOnChange={false}
                    initialValues={{
                        ...route.params.item
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ setFieldValue, values, handleSubmit }) => {
                        console.log(values);
                        return (
                            <ScrollView style={{ flex: 1 }}>
                                <ModalCamera show={show} setShow={setShow} setImage={setFieldValue} />
                                <View style={{ flex: 0.4 }}>
                                    <Image
                                        source={{ uri: values.image }}
                                        style={{
                                            height: SIZES.height * 0.4,
                                            width: "100%"
                                        }}
                                        resizeMode="cover"
                                    />

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
                                            backgroundColor: 'rgba(255,255,255,0.5)'
                                        }}
                                        onPress={() => navigation.goBack()}
                                    >
                                        <AntDesign
                                            name="arrowleft"
                                            size={30}
                                            color={COLORS.white}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            right: SIZES.padding,
                                            top: 15,
                                            height: 50,
                                            width: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 25,
                                            backgroundColor: 'rgba(255,255,255,0.5)'
                                        }}

                                        onPress={() => setShow(true)}
                                    >
                                        <Ionicons name="ios-camera-sharp" size={30} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        flex: 0.6,
                                        padding: SIZES.padding,
                                    }}
                                >
                                    {/* title */}
                                    <FastField
                                        name="title"
                                    >
                                        {(props) => (
                                            <InputField title="Title: " {...props} />
                                        )}
                                    </FastField>

                                    {/* category */}
                                    <FastField
                                        name="category"
                                    >
                                        {(props) => (
                                            <InputField title="Category: " {...props} />
                                        )}
                                    </FastField>

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
                                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        );
                    }}
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Detail;