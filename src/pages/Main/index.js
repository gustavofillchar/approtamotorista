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

  useEffect(() => {
    navigation.setParams({status: routeStatus});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeStatus]);

  const startRoute = useCallback(async () => {
    listenerPositionId.current = await listenerUserPosition(position => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates(prevState => [...prevState, position]);
    });

    const position = await getCurrentLocation();
    setRoute({
      id: Math.random(),
      initialTime: new Date(Date.now()),
      initialPosition: position,
      stops: [],
    });

    setRouteStatus(ROUTE_STATUS.ACTIVED);
  }, []);

  const cancelRoute = useCallback(() => {
    stopPositionListener(listenerPositionId.current);
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
    setRoute({});
  }, []);

  const finalizeRoute = useCallback(
    async finalPosition => {
      console.tron('FINAL POSITION: ', finalPosition);
      await storeRouteInStorage({...route, finalPosition, finalTime: Date.now()});
      stopPositionListener(listenerPositionId.current);
      setRoute({...route, finalPosition, finalTime: Date.now()});
      setRouteStatus(ROUTE_STATUS.FINALIZED);
    },
    [route],
  );

  const closeResultRoute = useCallback(() => {
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
    setRoute({});
  }, []);

  const markStop = useCallback(stop => {
    console.log('STOP: ', stop);
    setRoute(prevState => ({
      ...prevState,
      stops: [...prevState.stops, stop],
    }));
  }, []);

  const handleRouteSelection = useCallback(routeSelected => {
    setRoute(routeSelected);
  }, []);

  const renderContent = useCallback(() => {
    if (routeStatus === ROUTE_STATUS.ACTIVED) {
      return (
        <ActivedRoute route={route} onCancelRoute={cancelRoute} onFinalizeRoute={finalizeRoute} onMarkStop={markStop} />
      );
    } else if (routeStatus === ROUTE_STATUS.DESACTIVED) {
      return <InitRoute onInitRoute={startRoute} onRouteSelect={handleRouteSelection} />;
    } else {
      return <RouteResult route={route} onClose={closeResultRoute} />;
    }
  }, [cancelRoute, closeResultRoute, finalizeRoute, handleRouteSelection, markStop, route, routeStatus, startRoute]);

  return (
    <Container>
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

Main.navigationOptions = ({navigation}) => {
  const status = navigation.getParam('status');
  const title =
    status === ROUTE_STATUS.ACTIVED
      ? 'Gravando Rota'
      : status === ROUTE_STATUS.DESACTIVED
      ? 'Rotas'
      : 'Resumo da Viagem';

  return {
    title,
  };
};
