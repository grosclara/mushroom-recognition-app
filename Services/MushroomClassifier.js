import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, StyleSheet, Dimensions, View, Platform, Image } from "react-native";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
// import '@tensorflow/tfjs-react-native';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { MushroomDetails } from '../Helpers/mushroomData'

// getFlowerImagePrediction calls the "/predict"
// route on the server and fetches the top five
// predictions made by ML/DL model
export const getMushroomImagePrediction: (
  preprocessedUri: string,
  model,
  mushroomDB
) => Promise = (preprocessedUri, model, mushroomDB) => {
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

      const mushroomId = tf.argMax(prediction, -1).arraySync()[0];
      const score = Math.floor(100 * tf.max(prediction, -1).arraySync()[0]);
      const predictedMushroom = mushroomDB[mushroomId + 1];

      console.log("Prediction: " + mushroomId + "; Score: " + score);

      const mushroom : MushroomDetails = {
        id: mushroomId + 1,
        image: preprocessedUri,
        name: predictedMushroom['name'],
        latinName: predictedMushroom['latin'],
        link: predictedMushroom['link'],
        isEdible: !!predictedMushroom['edible'],
        isToxic: !!predictedMushroom['toxic']
      };
      resolve({
        mushroomDetails: mushroom,
        score: score
      });
    } catch (err) {
      reject(err);
    }
  });
};