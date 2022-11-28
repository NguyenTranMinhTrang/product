import * as ImagePicker from 'expo-image-picker';

const pickImage = async (setImage) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(result.assets);
    }

}

export default pickImage;