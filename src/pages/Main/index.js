import React, {useEffect, useState, useCallback, useReducer, useRef} from 'react';

import {Container, MapBox, ContainerInfo} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import InitRoute from './InitRoute';

import {fetchUserData} from '~/services/api';
import {storeUserDataInStorage, getUserDataFromStorage} from '~/storage/user';
import {getCurrentLocation, listenerUserPosition, stopPositionListener} from '~/utils/geolocation';
import {ActivityIndicator, View, Text} from 'react-native';
import {ROUTE_STATUS} from '~/utils/contants';
import ActivedRoute from './ActivedRoute';
import RouteResult from './RouteResult';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeStatus, setRouteStatus] = useState(ROUTE_STATUS.DESACTIVED);

  const watchId = useRef();

  useEffect(() => {
    async function getUserLocation() {
      const position = await getCurrentLocation();
      setCurrentLocation(position);
    }
    async function prepareUserData() {
      const previousUserData = await getUserDataFromStorage();
      if (!previousUserData) {
        const data = await fetchUserData();
        await storeUserDataInStorage(data);
        setUser(data);
      } else {
        setUser(previousUserData);
      }
    }
    prepareUserData();
    getUserLocation();
  }, []);

  const startRoute = useCallback(async () => {
    watchId.current = await listenerUserPosition(position => {
      console.log(position);
      setCurrentLocation(position);
    });
    setRouteStatus(ROUTE_STATUS.ACTIVED);
  }, []);

  const cancelRoute = useCallback(() => {
    stopPositionListener(watchId.current);
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
  }, []);

  const finalizeRoute = useCallback(() => {
    stopPositionListener(watchId.current);
    setRouteStatus(ROUTE_STATUS.FINALIZED);
  }, []);

  const closeResultRoute = useCallback(() => {
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
  }, []);

  const renderContent = useCallback(() => {
    if (routeStatus === ROUTE_STATUS.ACTIVED) {
      return <ActivedRoute onCancelRoute={cancelRoute} onFinalizeRoute={finalizeRoute} />;
    } else if (routeStatus === ROUTE_STATUS.DESACTIVED) {
      return <InitRoute onInitRoute={startRoute} />;
    } else {
      return <RouteResult onClose={closeResultRoute} />;
    }
  }, [cancelRoute, closeResultRoute, finalizeRoute, routeStatus, startRoute]);

  return (
    <Container>
      <View style={{padding: 10}}>
        <Text>Olá {user?.driver?.name}!</Text>
      </View>
      <MapBox>
        {currentLocation ? (
          <MapView
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0102,
              longitudeDelta: 0.0102,
            }}
            loadingEnabled={true}
            style={{height: '100%', width: '100%'}}>
            <Marker title="Sua posição atual" coordinate={currentLocation} />
          </MapView>
        ) : (
          <ActivityIndicator size={20} />
        )}
      </MapBox>

      {renderContent()}
    </Container>
  );
}
