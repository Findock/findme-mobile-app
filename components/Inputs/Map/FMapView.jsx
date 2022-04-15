import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  View, StyleSheet, Dimensions, Keyboard,
} from 'react-native';
import mapStyle from 'components/Inputs/Map/styles/styles.json';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import * as Location from 'expo-location';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import sizes from 'themes/sizes';
import { FSpinner } from 'components/Composition/FSpinner';
import placeholders from 'constants/components/inputs/placeholders';
import PropTypes from 'prop-types';
import { searchLocationByCoordinatesService } from 'services/location/searchLocationByCoordinates.service';
import { coordsDelta, initialCoordinates } from 'components/Inputs/Map/helper/mapHelper';

export const FMapView = ({
  height, isInteractive, location = {
    locationName: '',
    locationDescription: '',
  }, onChangeLocation, onChangeLocationDescription,
}) => {
  const { granted: status } = useLocationPermission();

  const [
    coordinates,
    setCoordinates,
  ] = useState(null);
  const [
    locationByCoords,
    setLocationByCoords,
  ] = useState('');

  useEffect(() => {
    getCoorindates();
  }, [status]);

  useEffect(() => {
    if (coordinates && Object.keys(coordinates).length > 0) searchLocationByCoords();
  }, [coordinates]);

  useEffect(() => {
    onChangeLocation(locationByCoords);
  }, [locationByCoords]);

  const searchLocationByCoords = async () => {
    const res = await searchLocationByCoordinatesService({
      lat: coordinates.latitude,
      lon: coordinates.longitude,
    });
    setLocationByCoords(res.data.name);
  };

  const getCoorindates = async () => {
    if (status) {
      const position = await Location.getCurrentPositionAsync();
      setCoordinates({
        ...coordsDelta,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } else setCoordinates({ ...initialCoordinates });
  };

  const locationDescriptionInputHandler = (newDescription) => {
    onChangeLocationDescription(newDescription);
  };

  const onChangeCoordinatesHandler = async (e) => {
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
            caretHidden
            placeholder={placeholders.MARK_ON_THE_MAP}
            type={inputTypes.TEXT}
            width={sizes.WIDTH_FULL}
            showSoftInputOnFocus={false}
            onChangeText={() => {}}
            onPress={() => {
              Keyboard.dismiss();
            }}
            value={locationByCoords}
          />
          <View>
            <FInput
              type={inputTypes.TEXT}
              width={sizes.WIDTH_FULL}
              placeholder={placeholders.ADD_LOCATION_DESCRIPTION}
              value={location.locationDescription}
              onChangeText={locationDescriptionInputHandler}
            />
          </View>
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
    left: sizes.POSITION_30,
  },
});

FMapView.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isInteractive: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    locationName: PropTypes.string.isRequired,
    locationDescription: PropTypes.string.isRequired,
  }).isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  onChangeLocationDescription: PropTypes.func.isRequired,
};
