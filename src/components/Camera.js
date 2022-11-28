import * as ImagePicker from 'expo-image-picker';

const openCamera = async (setImage, setShow) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);

    if (!result.canceled) {
        setImage("image", result.assets[0].uri);
        setShow(false);
    }
}

export default openCamera;