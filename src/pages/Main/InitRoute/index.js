import React, {useState, useEffect} from 'react';
import {Container} from './styles';
import {Button, Text} from 'react-native';
import {getRoutesFromStorage} from '~/storage/routes';

export default function InitRoute({onInitRoute}) {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    async function preparePreviousRoutes() {
      const previousRoutes = await getRoutesFromStorage();
      setRoutes(previousRoutes);
    }
    preparePreviousRoutes();
  }, []);

  return (
    <Container>
      <Text>{JSON.stringify(routes, null, 4)}</Text>
      <Button title="Iniciar Uma Rota Nova" onPress={onInitRoute} />
    </Container>
  );
}
