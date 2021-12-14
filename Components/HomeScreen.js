import React, { useState, useEffect, useRef, useMemo, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

import CustomCamera from './CustomCamera';
import { Camera } from 'expo-camera';
import { getMushroomImagePrediction, MushroomDetails } from '../Services/MushroomClassifier';

import { Avatar, Button, Card, Title, Paragraph, Chip, Badge } from 'react-native-paper';

import { WebView } from 'react-native-webview';

export default function HomeScreen () {
	
	const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();

	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["10%", "95%"], []);

  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState({
      loaded: false,
      mushroomDetails: null,
      score: 0
  })

  // Ask for Camera permissions
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);
	if (hasPermission === false) { return <Text>No access to camera</Text>; }
	if (hasPermission === null || !isFocused) { return <View />; }


  // Promise of classifying image
  const recognizeImage = async (image: string, preprocessedImage: string) => {

    // Module de chargement le temps que ça charge

    try {
      // Remove old predictions if any
      await Promise.all([     
        // Reset prediction
        setPrediction({
          loaded: false,
          mushroomDetails: null,
          score: 0
        }),
        setImage(image),
      ]);

      // Call prediction service with image
      const predictPayload = await getMushroomImagePrediction(preprocessedImage);
      if (predictPayload !== null) {
        setPrediction({
          loaded: true,
          mushroomDetails: predictPayload.mushroomDetails,
          score: predictPayload.score,
        });
      } else {
        return Alert.alert(
          "Ops",
          "Looks like something bad happened, please try again!"
        );
      }

    } catch (err) {
      console.log(err.message);
    }

    // Animate bottom sheet to cover whole screen
    bottomSheetRef.current?.snapToIndex(1);
  };


	return (
		<View style={styles.container}>

      <CustomCamera
          hasPermissionCamera={hasPermission}
          recognizeImage={recognizeImage}
      />

    	<BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}  
        backgroundComponent={() =>
          <View style={styles.bottomSheetContainer}/>
        }
        enableContentPanningGesture={false}>
        <BottomSheetScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.bottomSheetHeader}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{"Attrapez les tous! 🍄"}</Text>
          </View>

          { !prediction.loaded ? null : (

            <View style={styles.bottomSheetContent}>
              <Card style={{flex:0.5, marginTop: "7%", marginBottom: "7%"}}>
                <Card.Title 
                  title={prediction.mushroomDetails.name} 
                  subtitle={prediction.mushroomDetails.latinName}
                  right={() => <Badge>{prediction.score}</Badge>}
                  rightStyle={{padding: 20}} />
                <Card.Cover source={{ uri: image }}/>
                {/* <Card.Cover source={{ uri: prediction.mushroomDetails.image }} resizeMode='center'/> */}
                <Card.Actions>
                  { !prediction.mushroomDetails.isToxic ? null : (
                    <Chip 
                      icon="alert-circle" 
                      mode="outlined" 
                      selectedColor='red'>
                        Toxique
                    </Chip>
                  )}
                  { !prediction.mushroomDetails.isEdible ? null : (
                    <Chip 
                      icon="check" 
                      mode="outlined" 
                      selectedColor='green'>
                        Comestible
                    </Chip>
                  )}
                </Card.Actions>
              </Card>

              <Card style={{flex:0.5}}>
                <Card.Content style={{flex:1}}>
                  <WebView source={{ uri: prediction.mushroomDetails.link }} scalesPageToFit={true}
              scrollEnabled={true} />
                </Card.Content>
              </Card>

            </View>            
          ) }
          
         
       
        </BottomSheetScrollView>
      </BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    margin: 20,
  },
  button: {
    flex: 0.1,
		alignSelf: 'center'
  },


  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ecf0f1',
    flex: 1
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "flex-start",
    padding: 8,
    width: "100%",

  },
  bottomSheetHeader: {
    // alignContent: "center",
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: "-1%",
    // borderBottomWidth: 1,
    // borderBottomColor: "#C0C0C0",
    flex:0.04
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  bottomSheetContent: {
    flex: 1,
  },

});


// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';

// const HomeScreen = () => {
//   // ref
//   const bottomSheetRef = useRef(null);

//   // variables
//   const snapPoints = useMemo(() => ['5%', '100%'], []);

//   // callbacks
//   // const handleSheetChanges = useCallback((index: number) => {
//   //   console.log('handleSheetChanges', index);
//   // }, []);
// 	const handleSheetChanges = () => {
// 		  console.log('handleSheetChanges');
// 	};

//   // renders
//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//         enablePanDownToClose='true'
//       >
//         <View style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;