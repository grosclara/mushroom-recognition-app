import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, StyleSheet, Dimensions, View, Platform, Image } from "react-native";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
// import '@tensorflow/tfjs-react-native';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

import cat from '../assets/cat.jpeg'


const modelPath = "champilove/models/mushroom.all.ort";

export interface MushroomDetails {
  id: number,
  image: string,
  name: string,
  latinName: string,
  isEdible: boolean,
  isToxic: boolean,
  link: string,
};

// getFlowerImagePrediction calls the "/predict"
// route on the server and fetches the top five
// predictions made by ML/DL model
export const getMushroomImagePrediction: (
  preprocessedUri: string,
  model
) => Promise = (preprocessedUri, model) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (model === null) {
        resolve(null);
      }

      // Load image from uri to base64 encoded string
      const imgB64 = await FileSystem.readAsStringAsync(preprocessedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const imageTensor = tf.cast(decodeJpeg(raw).reshape([1, 3, 224, 224]), 'float32');

      const prediction = await model.predict(imageTensor).softmax(-1);

      console.log("Prediction: " + tf.argMax(prediction, -1) + "; Score: " + tf.max(prediction, -1));

      const mushroom : MushroomDetails = {
        id: 3,
        image: preprocessedUri,
        name: "Champilove",
        latinName: "Champignonus Lovinus",
        link: "https://fr.wikipedia.org/wiki/Chanterelle",
        isEdible: true,
        isToxic: true
      };
      resolve({
        mushroomDetails: mushroom,
        score: 98
      });
    } catch (err) {
      reject(err);
    }
  });
};