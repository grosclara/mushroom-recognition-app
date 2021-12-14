import { InferenceSession } from "onnxruntime-react-native";

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
  photoUri: string
) => Promise = (photoUri) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mushroom : MushroomDetails = {
        id: 3,
        image: photoUri,
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