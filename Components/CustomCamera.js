import React, { useRef, useState, useEffect} from "react";
import { TouchableOpacity, StyleSheet, Dimensions, View, Platform, Button } from "react-native";
import { Camera } from "expo-camera";
import BarcodeMask from 'react-native-barcode-mask';
import { Ionicons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


const { width, height } = Dimensions.get("window");
const screenRatio = height / width;

export type CameraProps = {
    hasPermissionCamera: boolean;
    recognizeImage: (image: string, croppedImage: string) => void;
  };


const CustomCamera = ({
  hasPermissionCamera,
  recognizeImage,
}: CameraProps) => {

  const cameraRef = useRef(null)
  // const [ratio, setRatio] = useState('4:3');  // default is 4:3
  // const [isRatioSet, setIsRatioSet] =  useState(false);
  // const [imagePadding, setImagePadding] = useState(0);

  const takePictureAsync = async () => {
    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.3,
    });
    const preprocessed = await preprocess(picture);
    recognizeImage(picture.uri, preprocessed.uri);
  };

  const preprocess = async (image) => {
    const preprocessed = await manipulateAsync(
      image.uri,
      [
        { crop: { 
          height: 500, 
          originX: image.width/2-500/2, 
          originY: image.height/2-500/2, 
          width: 500}
        },
        { resize: { 
          height: 224,
          width: 224}
        }
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    return preprocessed;
  };

  // On screen load, ask for permission to use the camera
  useEffect(() => {
    (async () => { 
      const sizes = await cameraRef.current. getAvailablePictureSizesAsync("16:9");
      console.debug("pictureSizes", sizes)
    })();
    }, []);

  return (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.back}
      ref={cameraRef}
      ratio="16:9"
      pictureSize="1280x720"
		>
      <BarcodeMask width={240} height={240} showAnimatedLine={false} outerMaskOpacity={0.1}/>

      <View style={styles.buttonContainer}>
        <Ionicons style={styles.button}
          name="camera"
          size={32}
          color="white"
          onPress={takePictureAsync}
        />
      </View>


		</Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: height,
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    margin: 20,
  },
  button: {
    flex: 0.15,
		alignSelf: 'center'
  },
});

export default CustomCamera;