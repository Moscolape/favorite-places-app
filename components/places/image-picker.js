import React from "react";
import { Alert, Text, View, StyleSheet, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/outlined-button";

function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [imageUri, setImageUri] = React.useState("");

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImage() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!image.canceled) {
        setImageUri(image.assets[0].uri);
        // console.log(image.assets[0].uri);
      } else {
        Alert.alert("No image taken", "You didn't take any image.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while taking the image.");
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (imageUri) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImage}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 250,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%"
  },
});

export default ImagePicker;
