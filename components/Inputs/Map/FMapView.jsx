import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  View, StyleSheet, Dimensions,
} from 'react-native';
import mapStyle from 'components/Inputs/Map/styles/styles.json';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import * as Location from 'expo-location';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/inputTypes';
import sizes from 'themes/sizes';
import { FSpinner } from 'components/Composition/FSpinner';
import locales from 'constants/locales';

export const FMapView = ({ height, isInteractive }) => {
  const { granted: status } = useLocationPermission();
  const coordsDelta = {
    latitudeDelta: 0.00022,
    longitudeDelta: (Dimensions.get('window').width / Dimensions.get('window').height) * 0.00250,
  };
  const [
    coordinates,
    setCoordinates,
  ] = useState(null);

  const [
    location,
    setLocation,
  ] = useState({
    location: '',
    description: '',
  });

  useEffect(() => {
    getCoorindates();
  }, [status]);
  const getCoorindates = async () => {
    if (status) {
      const position = await Location.getCurrentPositionAsync();
      setCoordinates({
        ...coordsDelta,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } else {
      setCoordinates({
        ...coordsDelta,
        latitude: 52.224665768,
        longitude: 21.006499974,
      });
    }
  };

  const locationDescriptionInputHandler = (newDescription) => {
    setLocation({
      ...setLocation,
      description: newDescription,
    });
  };

  const locationInputHandler = (newLocation) => {
    setLocation({
      ...setLocation,
      location: newLocation,
    });
  };

  const onChangeCoordinatesHandler = (e) => {
    const { coordinate } = e.nativeEvent;
    if (coordinate) {
      setCoordinates({
        ...coordsDelta,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    }
  };

  return (
    <View>
      {isInteractive && (
        <View>
          <FInput
            type={inputTypes.TEXT}
            width={sizes.WIDTH_FULL}
            placeholder={locales.SEARCH_OR_MARK_ON_THE_MAP}
            value={location.location}
            onChangeText={locationDescriptionInputHandler}
          />
          <FInput
            type={inputTypes.TEXT}
            width={sizes.WIDTH_FULL}
            placeholder={locales.ADD_LOCATION_DESCRIPTION}
            value={location.description}
            onChangeText={locationInputHandler}
          />
        </View>
      ) }

      <View style={{
        ...styles.mapContainer,
        height,
      }}
      >
        {!coordinates ? <FSpinner /> : (
          <MapView
            scrollEnabled={isInteractive}
            style={styles.map}
            provider="google"
            region={coordinates}
            customMapStyle={mapStyle}
            onPress={isInteractive ? (e) => onChangeCoordinatesHandler(e) : () => {}}
            onPoiClick={isInteractive ? (e) => onChangeCoordinatesHandler(e) : () => { }}
            zoomEnabled={isInteractive}
            rotateEnabled={isInteractive}
          >
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
              pinColor="orange"
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: Dimensions.get('window').width,
    left: sizes.POSITION_N30,
  },
  map: {
    width: sizes.WIDTH_FULL,
    height: sizes.HEIGHT_90_PERCENTAGES,
  },
});
