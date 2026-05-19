import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { colors } from '../constants/theme';

export default function CustomMapView({ region, style }: any) {
  return (
    <MapView
      style={[styles.map, style]}
      initialRegion={region}
      region={region}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
