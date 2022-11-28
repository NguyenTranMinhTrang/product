import * as ImagePicker from 'expo-image-picker';

const openCamera = async (setImage) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(result.assets);
    }
}

export default openCamera;