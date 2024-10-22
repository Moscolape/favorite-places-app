import React, { useEffect, useState } from "react";
import PlacesList from "../components/places/places-list";
import { useIsFocused } from '@react-navigation/native';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params?.place) {
      // @ts-ignore
      setLoadedPlaces((curPlaces) => {
        // @ts-ignore
        const existingPlace = curPlaces.find(p => p.id === route.params.place.id);
        if (!existingPlace) {
          return [...curPlaces, route.params.place];
        }
        return curPlaces;
      });
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
