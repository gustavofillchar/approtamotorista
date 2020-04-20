import React from 'react';
import {Container} from './styles';
import {Button} from 'react-native';

export default function InitRoute({onInitRoute}) {
  return (
    <Container>
      <Button title="Iniciar Rota" onPress={onInitRoute} />
    </Container>
  );
}
