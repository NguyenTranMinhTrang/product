import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const pickImage = async (setImage, setShow) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this appp to access your photos!");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
        setImage("image", result.assets[0].uri);
        setShow(false);
    }
};

export default pickImage;