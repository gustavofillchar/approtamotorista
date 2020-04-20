import React from 'react';
import {Container, Title, Controls} from './styles';
import {Button} from 'react-native';
import {Margin} from '~/components/GlobalStyles';

export default function ActivedRoute({onFinalizeRoute, onCancelRoute}) {
  return (
    <Container>
      <Title>Rota Ativa</Title>
      <Controls>
        <Button title="Cancelar Rota" onPress={onCancelRoute} color="#757575" />
        <Margin horizontal={2.5} />
        <Button title="Finalizar Rota" onPress={onFinalizeRoute} color="#9ccc65" />
      </Controls>
    </Container>
  );
}
