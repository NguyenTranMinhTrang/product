import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { BlurView } from 'expo-blur';
import { openCamera, pickImage } from "../components";

const ModalCamera = ({ show, setShow, setImage }) => {
    const handelCamera = () => {
        openCamera(setImage, setShow);
    };

    const handleLibrary = () => {
        pickImage(setImage, setShow);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <BlurView
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                intensity={80}
                tint="dark"
            >
                {/* button to close modal */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                    onPress={() => setShow(false)}
                >

                </TouchableOpacity>

                {/* Content */}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '85%',
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius
                    }}
                >
                    <View
                        style={{
                            borderBottomWidth: 1,
                            height: 90,
                            width: '100%',
                            alignItems: 'center',
                            borderTopLeftRadius: SIZES.radius,
                            borderTopRightRadius: SIZES.radius,
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{ ...FONTS.h2, padding: SIZES.base }}>Chọn 1 tấm ảnh</Text>
                    </View>
                    {/* Camera */}
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '100%',
                            borderBottomWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius * 2,
                            marginBottom: SIZES.base,
                        }}
                        onPress={handelCamera}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Dùng camera</Text>
                    </TouchableOpacity>

                    {/* Library */}
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius * 2,
                            marginBottom: SIZES.padding,
                        }}

                        onPress={handleLibrary}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.black }}>Dùng thư viện ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '91%',
                            backgroundColor: COLORS.black,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: SIZES.padding * 2,
                            borderRadius: SIZES.radius
                        }}

                        onPress={() => setShow(false)}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
};

export default ModalCamera;