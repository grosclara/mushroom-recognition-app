import * as FileSystem from 'expo-file-system';
import MushroomItem from "../Components/MushroomItem";


export interface MushroomDetails {
  id: number,
    image: string,
    name: string,
    latinName: string,
    isEdible: boolean,
    isToxic: boolean,
    link: string,
};

export const loadMushroomDB: (dbPath: string) => Promise =
  (dbPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dbPath);
      const dbString = await FileSystem.readAsStringAsync(dbPath, {
        encoding: FileSystem.EncodingType.UTF8
      });
      const db_arr = dbString.split("\r\n");

      const db = {};
      for (let i = 0; i < db_arr.length; ++i) {
        if (i == 0) {
          continue;
        }
        const csv_line = db_arr[i].split(";");
        const id = parseInt(csv_line[0], 10);
        const mushroom : MushroomItem = {
          id: id,
          is_edible: !!parseInt(csv_line[1], 10),
          latinName: csv_line[2],
          name: csv_line[3],
          isToxic: !!parseInt(csv_line[4], 10),
          link: csv_line[5],
          image: null,
        };
        db[id] = mushroom;

      }

      resolve(db);
    } catch (err) {
      reject(err);
    }
  })
};

export default data = [
  {
    id:181808,
    vote_average:7.2,
    title:"Star Wars VIII - Les derniers Jedi",
    poster_path:"",
    original_title:"Star Wars: The Last Jedi",
    overview:"Nouvel épisode de la saga. Les héros du Réveil de la force rejoignent les figures légendaires de la galaxie dans une aventure épique qui révèle des secrets ancestraux sur la Force et entraîne de choquantes révélations sur le passé…",
    release_date:"2017-12-13"
  },
  {
    id:181809,
    vote_average:8.1,
    title:"La Guerre des étoiles",
    poster_path:"",
    original_title:"Star Wars",
    overview:"Il y a bien longtemps, dans une galaxie très lointaine... La guerre civile fait rage entre l'Empire galactique et l'Alliance rebelle. Capturée par les troupes de choc de l'Empereur menées par le sombre et impitoyable Dark Vador, la princesse Leia Organa dissimule les plans de l’Étoile Noire, une station spatiale invulnérable, à son droïde R2-D2 avec pour mission de les remettre au Jedi Obi-Wan Kenobi. Accompagné de son fidèle compagnon, le droïde de protocole C-3PO, R2-D2 s'échoue sur la planète Tatooine et termine sa quête chez le jeune Luke Skywalker. Rêvant de devenir pilote mais confiné aux travaux de la ferme, ce dernier se lance à la recherche de ce mystérieux Obi-Wan Kenobi, devenu ermite au cœur des montagnes désertiques de Tatooine...",
    release_date:"1977-05-25"
  }
 ]