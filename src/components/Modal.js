import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';
import { openCamera, pickImage } from "../components"

const Modal = ({ show, setShow }) => {
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
                    style={styles.absolute}
                    onPress={() => setShow(false)}
                >

                </TouchableOpacity>

                {/* Content */}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '85%',
                        backgroundColor: COLORS.lightGray2,
                        borderRadius: SIZES.radius
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.lightGray2,
                            paddingBottom: SIZES.padding,
                            height: 90,
                            width: '100%',
                            alignItems: 'center',
                            borderTopLeftRadius: SIZES.radius,
                            borderTopRightRadius: SIZES.radius,
                        }}
                    >
                        <Text style={{ ...FONTS.body1, padding: SIZES.base }}>Chọn 1 tấm ảnh</Text>
                    </View>
                    {/* Camera */}
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '91%',
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius * 2,
                            marginBottom: SIZES.base,
                        }}
                        onPress={openCamera}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Dùng camera</Text>
                    </TouchableOpacity>

                    {/* Library */}
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '91%',
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius * 2,
                            marginBottom: SIZES.padding,
                        }}

                        onPress={pickImage}
                    >
                        <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Dùng thư viện ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 70,
                            width: '91%',
                            backgroundColor: COLORS.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: SIZES.padding * 2,
                            borderRadius: SIZES.radius
                        }}

                        onPress={() => setShow(false)}
                    >

                        {/* {
                            isLoading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Hủy</Text>
                        } */}
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    )
}

export default Modal;