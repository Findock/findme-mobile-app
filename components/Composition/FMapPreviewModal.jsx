import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FMapView } from 'components/Inputs/Map/FMapView';
import sizes from 'themes/sizes';
import React, { useEffect, useState } from 'react';
import { FSpinner } from 'components/Composition/FSpinner';
import colors from 'themes/colors';
import locales from 'constants/locales';
import { FModalHeader } from 'components/Composition/FModalHeader';

export const FMapPreviewModal = () => {
  const route = useRoute();
  const [
    location,
    setLocation,
  ] = useState(null);

  useEffect(() => {
    if (route.params?.location) setLocation(route.params.location);
  }, [route.params.location]);

  if (!location) return <FSpinner />;
  return (
    <View style={styles.container}>
      <FModalHeader title={locales.LOCATION} />
      <View style={{
        justifyContent: 'center',
        height: sizes.HEIGHT_FULL,
      }}
      >
        <FMapView
          width={sizes.WIDTH_FULL}
          doNotLoadCoordinatesFromLocation
          height="85%"
          onChangeLocation={() => {
          }}
          onChangeCoordinates={() => {
          }}
          onChangeLocationDescription={() => {
          }}
          isInteractive={false}
          lat={+location.latitude}
          lon={+location.longitude}
          markerTitle={location.name}
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
