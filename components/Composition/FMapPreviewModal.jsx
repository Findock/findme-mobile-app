import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FMapView } from 'components/Inputs/Map/FMapView';
import sizes from 'themes/sizes';
import React, { useEffect, useState } from 'react';
import { FSpinner } from 'components/Composition/FSpinner';
import colors from 'themes/colors';
import locales from 'constants/locales';
import { FModalHeader } from 'components/Composition/FModalHeader';
import { coordsDelta } from 'components/Inputs/Map/helper/mapHelper';

export const FMapPreviewModal = () => {
  const route = useRoute();
  const [
    location,
    setLocation,
  ] = useState(null);
  const [
    isInteractive,
    setIsInteractive,
  ] = useState(false);
  const [
    showLocationDescriptionInput,
    setShowLocationDescriptionInput,
  ] = useState(false);
  const [
    showLocationNameInput,
    setShowLocationNameInput,
  ] = useState(false);
  const [
    coordinates,
    setCoordinates,
  ] = useState({
    ...coordsDelta,
    latitude: +location?.latitude || 0,
    longitude: +location?.longitude || 0,
  });

  useEffect(() => {
    if (route.params?.location) setLocation(route.params.location);
  }, [route.params.location]);

  useEffect(() => {
    if (route.params?.isInteractive !== undefined || route.params?.isInteractive !== null) setIsInteractive(route.params.isInteractive);
  }, [route.params.isInteractive]);

  useEffect(() => {
    if (route.params?.showLocationDescriptionInput !== undefined
      || route.params?.showLocationDescriptionInput !== null) {
      setShowLocationDescriptionInput(route.params.showLocationDescriptionInput);
    }
  }, [route.params.showLocationDescriptionInput]);

  useEffect(() => {
    if (route.params?.showLocationNameInput !== undefined
      || route.params?.showLocationNameInput !== null) {
      setShowLocationNameInput(route.params.showLocationNameInput);
    }
  }, [route.params.showLocationNameInput]);

  if (!location) return <FSpinner />;
  return (
    <View style={styles.container}>
      <FModalHeader
        title={locales.LOCATION}
        hasConfirmButton
        onConfirm={() => {
          if (route.params?.onConfirm) {
            route.params?.onConfirm(coordinates);
          }
        }}
      />
      <View style={{
        justifyContent: 'center',
        height: sizes.HEIGHT_FULL,
      }}
      >
        <FMapView
          width={sizes.WIDTH_FULL}
          doNotLoadCoordinatesFromLocation
          height={sizes.HEIGHT_85_PERCENTAGES}
          onChangeLocation={() => {
          }}
          onChangeCoordinates={(coords) => {
            if (isInteractive) setCoordinates(coords);
          }}
          onChangeLocationDescription={() => {
          }}
          isInteractive={isInteractive}
          lat={+location.latitude}
          lon={+location.longitude}
          markerTitle={location.name}
          showLocationDescriptionInput={showLocationDescriptionInput}
          showLocationNameInput={showLocationNameInput}
          inputsContainerStyles={route.params?.inputsContainerStyles ? route.params?.inputsContainerStyles : ''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
