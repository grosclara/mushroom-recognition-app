import { InferenceSession } from "onnxruntime-react-native";
import { TouchableOpacity, StyleSheet, Dimensions, View, Platform, Image } from "react-native";

const modelPath = "../models/mushroom.onnx";

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
  preprocessedUri: string
) => Promise = (preprocessedUri) => {
  return new Promise(async (resolve, reject) => {
    try {
      Image.getSize(preprocessedUri, (width, height) => {
        console.log("preprocessedWidth", width)
        console.log("preprocessedHeight", height)}
      );

      const mushroom : MushroomDetails = {
        id: 3,
        image: preprocessedUri,
        name: "Champilove",
        latinName: "Champignonus Lovinus",
        link: "https://fr.wikipedia.org/wiki/Chanterelle",
        isEdible: true,
        isToxic: true
      }
      resolve({
        mushroomDetails: mushroom,
        score: 98
      });
    } catch (err) {
      reject(err);
    }
  });
};