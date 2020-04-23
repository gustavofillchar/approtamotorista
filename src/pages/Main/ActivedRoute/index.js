import React, {useState, useEffect, useCallback} from 'react';
import {Container, Title, Controls} from './styles';
import {Button} from 'react-native';
import {Margin} from '~/components/GlobalStyles';
import {getCurrentLocation} from '~/utils/geolocation';
import StopsList from './StopsList';
import ActionsBar from './ActionsBar';
import DialogStudents from './DialogStudents';

export default function ActivedRoute({route, onFinalizeRoute, onCancelRoute, onMarkStop}) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleFinalizeRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    onFinalizeRoute(finalPosition);
  }, [onFinalizeRoute]);

  const handleMarkStop = useCallback(
    async amountStudents => {
      setDialogVisible(false);
      const position = await getCurrentLocation();
      const stop = {coords: position, amountStudents};
      onMarkStop(stop);
    },
    [onMarkStop],
  );

  return (
    <Container>
      {/* <StopsList stops={route.stops} /> */}
      <DialogStudents visible={dialogVisible} onCancel={() => setDialogVisible(false)} onSubmit={handleMarkStop} />
      <ActionsBar
        onCancelRoute={onCancelRoute}
        onEndRoute={handleFinalizeRoute}
        onMarkStop={() => setDialogVisible(true)}
      />
      {/* <Controls>
        <Button title="Cancelar Rota" onPress={onCancelRoute} color="#757575" />
        <Margin horizontal={2.5} />
        <Button title="Finalizar Rota" onPress={handleFinalizeRoute} color="#9ccc65" />
      </Controls> */}
    </Container>
  );
}
