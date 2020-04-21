import React, {useState, useEffect, useCallback} from 'react';
import {Container} from './styles';
import {Button, Text} from 'react-native';
import {getRoutesFromStorage} from '~/storage/routes';
import RoutesList from './RoutesList';

export default function InitRoute({onInitRoute, onRouteSelect}) {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    async function preparePreviousRoutes() {
      const previousRoutes = await getRoutesFromStorage();
      setRoutes(previousRoutes);
    }
    preparePreviousRoutes();
  }, []);

  const handleRoutePress = useCallback(
    route => {
      onRouteSelect(route);
    },
    [onRouteSelect],
  );

  return (
    <Container>
      <RoutesList routes={routes} onRoutePress={handleRoutePress} />
      <Button title="Iniciar Uma Rota Nova" onPress={onInitRoute} />
    </Container>
  );
}
