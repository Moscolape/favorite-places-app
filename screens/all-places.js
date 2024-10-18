import React from "react";
import PlacesList from "../components/places/places-list";

import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      // @ts-ignore
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;