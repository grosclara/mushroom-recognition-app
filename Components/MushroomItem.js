import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const MushroomItem = (props) => {
  const mushroom = props.mushroom
  return (
    <View style={styles.main_container}>
      <Image
        style={styles.image}
        source={{uri: "image"}}
      />
      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{mushroom.title}</Text>
          <Text style={styles.vote_text}>{mushroom.vote_average}</Text>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text} numberOfLines={6}>{mushroom.overview}</Text>
        </View>
        <View style={styles.date_container}>
          <Text style={styles.date_text}>Sorti le {mushroom.release_date}</Text>
        </View>
      </View>
    </View>
    // <View style={styles.center}>
    //   <Text>Hello {props.title}!</Text>
    // </View> 
  );
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

// const styles = StyleSheet.create({
//   center: {
//     alignItems: 'center'
//   }
// })

export default MushroomItem;