import React from 'react';
import {Container, Label} from './styles';

export default function RouteItem({route, onPress}) {
  return (
    <Container onPress={onPress}>
      <Label>Rota {route.id}</Label>
    </Container>
  );
}
