import React, {useEffect, useState, useCallback, useRef} from 'react';

import {Container, MapBox, ContainerInfo} from './styles';
import InitRoute from './InitRoute';

import {fetchUserData} from '~/services/api';
import {storeUserDataInStorage, getUserDataFromStorage} from '~/storage/user';
import {getCurrentLocation, listenerUserPosition, stopPositionListener} from '~/utils/geolocation';
import {ActivityIndicator, View, Text, Image} from 'react-native';
import {ROUTE_STATUS} from '~/utils/contants';
import ActivedRoute from './ActivedRoute';
import RouteResult from './RouteResult';
import Map from './Map';
import {storeRouteInStorage} from '~/storage/routes';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [routeStatus, setRouteStatus] = useState(ROUTE_STATUS.DESACTIVED);

  const listenerPositionId = useRef();

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
    listenerPositionId.current = await listenerUserPosition(position => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates(prevState => [...prevState, position]);
    });

    const position = await getCurrentLocation();
    setRoute({
      id: Math.random(),
      initialPosition: position,
      stops: [],
    });

    setRouteStatus(ROUTE_STATUS.ACTIVED);
  }, []);

  const cancelRoute = useCallback(() => {
    stopPositionListener(listenerPositionId.current);
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
  }, []);

  const finalizeRoute = useCallback(
    async finalPosition => {
      console.tron('FINAL POSITION: ', finalPosition);
      await storeRouteInStorage({...route, finalPosition});
      stopPositionListener(listenerPositionId.current);
      setRouteStatus(ROUTE_STATUS.FINALIZED);
    },
    [route],
  );

  const closeResultRoute = useCallback(() => {
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
  }, []);

  const markStop = useCallback(stop => {
    console.tron('STOP: ', stop);
    setRoute(prevState => ({
      ...prevState,
      stops: [...prevState.stops, stop],
    }));
  }, []);

  const renderContent = useCallback(() => {
    if (routeStatus === ROUTE_STATUS.ACTIVED) {
      return (
        <ActivedRoute route={route} onCancelRoute={cancelRoute} onFinalizeRoute={finalizeRoute} onMarkStop={markStop} />
      );
    } else if (routeStatus === ROUTE_STATUS.DESACTIVED) {
      return <InitRoute onInitRoute={startRoute} />;
    } else {
      return <RouteResult onClose={closeResultRoute} />;
    }
  }, [cancelRoute, closeResultRoute, finalizeRoute, markStop, route, routeStatus, startRoute]);

  return (
    <Container>
      <View style={{padding: 10}}>
        <Text>Olá {user?.driver?.name}!</Text>
      </View>
      <MapBox>
        {currentLocation ? (
          <Map location={currentLocation} route={route} status={routeStatus} />
        ) : (
          <ActivityIndicator size={20} />
        )}
      </MapBox>
      {renderContent()}
    </Container>
  );
}
