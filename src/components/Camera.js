import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const openCamera = async (setImage, setShow) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this appp to access your camera!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
        setImage("image", result.assets[0].uri);
        setShow(false);
    }
};

export default openCamera;