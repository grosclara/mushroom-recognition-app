import React, { useRef, useState, useEffect} from "react";
import { TouchableOpacity, StyleSheet, Dimensions, View, Platform } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");
const screenRatio = height / width;

export type CameraProps = {
    hasPermissionCamera: boolean;
    recognizeImage: (image: string) => void;
  };


const CustomCamera = ({
  hasPermissionCamera,
  recognizeImage,
}: CameraProps) => {

  const cameraRef = useRef(null)
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const [isRatioSet, setIsRatioSet] =  useState(false);
  const [imagePadding, setImagePadding] = useState(0);

  const takePictureAsync = async () => {
    const picture = await cameraRef.current.takePictureAsync({
      quality: 1,
    });
    console.debug("takePicture", picture);
    recognizeImage(picture.uri);
  };

  // On screen load, ask for permission to use the camera
  useEffect(() => {
    (async () => { 
      let desiredRatio = '4:3';  // Start with the system default
      // This issue only affects Android
      if (Platform.OS === 'android') {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();
        console.debug(ratios)

        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of ratios) {
          const parts = ratio.split(':');
          const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
          realRatios[ratio] = realRatio;
          // ratio can't be taller than screen, so we don't want an abs()
          const distance = screenRatio - realRatio; 
          distances[ratio] = realRatio;
          if (minDistance == null) {
            minDistance = ratio;
          } else {
            if (distance >= 0 && distance < distances[minDistance]) {
              minDistance = ratio;
            }
          }
        }
        // set the best match
        desiredRatio = minDistance;
        //  calculate the difference between the camera width and the screen height
        const remainder = Math.floor(
          (height - realRatios[desiredRatio] * width) / 2
        );
        // set the preview padding and preview ratio
        setImagePadding(remainder);
        setRatio(desiredRatio);
        // Set a flag so we don't do this 
        // calculation each time the screen refreshes
        setIsRatioSet(true);
        console.debug(ratio)
      }
    })();
    }, []);

  return (
    <Camera 
      style={styles.camera} 
      type={Camera.Constants.Type.back}
      ref={cameraRef}
      ratio={ratio}
		>
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