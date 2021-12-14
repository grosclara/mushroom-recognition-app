import React from 'react'
import { StyleSheet, View, FlatList, TextInput, Button } from 'react-native'

import MushroomItem from "./MushroomItem";
import mushroomData from '../Helpers/mushroomData';


const FavoritesList = (props) => {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     mushrooms=[]
  //   }
  // }

  return (
    <View style={styles.main_container}>
      <FlatList
          data={mushroomData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <MushroomItem mushroom={item}/>}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default FavoritesList;