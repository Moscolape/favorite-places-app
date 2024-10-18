import React from "react";
import PlaceForm from "../components/places/place-form";
import { View, StyleSheet } from "react-native";

function AddPlace({navigation}) {
  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', {
      place: place
    });
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
