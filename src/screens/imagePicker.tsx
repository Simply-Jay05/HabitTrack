import {
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Picker from "expo-image-picker";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { storage } from "../config/firebase";

export default function ImagePicker() {
  // To get user ID
  const { user } = useAuth();
  const userId = user?.uid;
  // To manage loading state
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  // To hold our image URI
  const [image, setImage] = useState<string | undefined>(undefined);

  // To let users take image from their camera - launchCameraAsync()
  const takeImage = async () => {
    setCameraLoading(true);
    try {
      // 1. Ask for user permission
      const permission = await Picker.requestCameraPermissionsAsync();

      // 2. Confirm user gave permission
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to use camera is required",
        );
        return;
      }

      // 3. To activate user Camera
      const result = await Picker.launchCameraAsync({
        cameraType: Picker.CameraType.front,
        mediaTypes: ["images"],
        aspect: [16, 9],
        allowsEditing: true,
      });

      // 4. Confirm if user actually selceted an image
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error choosing image from gallery: ", error);
    } finally {
      setCameraLoading(false);
    }
  };

  // To let users access image from their devices - lauchImageLibraryAsync()
  const chooseImage = async () => {
    setGalleryLoading(true);
    try {
      // 1. Ask for user permission
      const permission = await Picker.requestMediaLibraryPermissionsAsync();

      // 2. Confirm user gave permission
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to pick image from gallery is required",
        );
        return;
      }

      // 3. Get the image user selected
      const result = await Picker.launchImageLibraryAsync({
        mediaTypes: ["videos", "images"],
        aspect: [16, 9],
        allowsEditing: true,
        // allowsMultipleSelection: true,
      }); // For user to pick an Image

      // 4. Confirm if user actually selceted an image
      if (!result.canceled) {
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error choosing image from gallery: ", error);
    } finally {
      setGalleryLoading(false);
    }
  };

  const uploadImage = async (uri: string) => {
    // 1. fetch image from the device - URI
    const response = await fetch(uri); // Access the image locally

    // 2. Convert image to uploadable format - blob
    const blob = await response.blob();

    // 3. Set Location reference in firestore syorage
    const imageRef = ref(storage, `profile-image/${userId}.jpg`);

    // 4.  To actuall upload our image
    await uploadBytes(imageRef, blob);

    // 5. To get URL to pointing to our uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    setImage(downloadURL);
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImg}
        source={image ? { uri: image } : require("../../assets/profile.png")}
      />
      <View>
        {galleryLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Update image from gallery" onPress={chooseImage} />
        )}

        {cameraLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Take image from camera" onPress={takeImage} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    width: wp("35%"),
    height: wp("35%"),
    borderRadius: wp("17.5%"),
    marginBottom: hp("1%"),
  },
  btnView: {
    gap: hp("2%"),
  },
});
