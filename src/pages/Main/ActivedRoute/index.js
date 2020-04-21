import React, {useState, useEffect, useCallback} from 'react';
import {Container, Title, Controls} from './styles';
import {Button} from 'react-native';
import {Margin} from '~/components/GlobalStyles';
import {getCurrentLocation} from '~/utils/geolocation';
import StopsList from './StopsList';

export default function ActivedRoute({route, onFinalizeRoute, onCancelRoute, onMarkStop}) {
  const handleFinalizeRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    onFinalizeRoute(finalPosition);
  }, [onFinalizeRoute]);

  const handleMarkStop = useCallback(async () => {
    const position = await getCurrentLocation();
    const stop = {coords: position};
    onMarkStop(stop);
  }, [onMarkStop]);

  return (
    <Container>
      <Title>Rota Ativa</Title>

      <Button title="Marcar parada" onPress={handleMarkStop} />
      <StopsList stops={route.stops} />

      <Controls>
        <Button title="Cancelar Rota" onPress={onCancelRoute} color="#757575" />
        <Margin horizontal={2.5} />
        <Button title="Finalizar Rota" onPress={handleFinalizeRoute} color="#9ccc65" />
      </Controls>
    </Container>
  );
}
