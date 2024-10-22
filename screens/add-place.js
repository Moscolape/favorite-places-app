import React from "react";
import PlaceForm from "../components/places/place-form";
import { View, StyleSheet } from "react-native";
import { insertPlace } from "../util/database";

function AddPlace({navigation}) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }

  return (
    <View style={styles.screen}>
      <PlaceForm onCreatePlace={createPlaceHandler}/>
    </View>
  );
}

export default AddPlace;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
