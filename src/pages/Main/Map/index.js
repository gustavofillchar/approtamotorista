import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Image} from 'react-native';
import {ROUTE_STATUS} from '~/utils/contants';

export default function Map({location, route, status}) {
  return (
    <MapView
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0102,
        longitudeDelta: 0.0102,
      }}
      loadingEnabled={true}
      style={{height: '100%', width: '100%'}}>
      <Marker title="Sua posição atual" coordinate={location}>
        <Image source={require('~/assets/car.png')} style={{width: 20, height: 20}} />
      </Marker>
      {status === ROUTE_STATUS.ACTIVED && (
        <>
          {route.stops.map(stop => {
            return (
              <Marker title="Sua posição atual" coordinate={stop.coords}>
                <Image source={require('~/assets/stop-sign.png')} style={{width: 20, height: 20}} />
              </Marker>
            );
          })}
        </>
      )}
    </MapView>
  );
}
