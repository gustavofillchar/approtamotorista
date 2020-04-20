import React from 'react';
import {
  Info,
  Title,
  BoxTripDetail,
  DescriptTitle,
  InfoBoxDescript,
  InfoDescriptText,
  CloseBox,
  CloseTitle,
  ContainerInfo,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Separator} from '~/components/GlobalStyles';

export default function RouteResult({onClose}) {
  return (
    <ContainerInfo>
      <Info>
        <Title>Resumo da Viagem</Title>
      </Info>
      <BoxTripDetail>
        <Icon name="clock-start" size={25} color="#555" />
        <DescriptTitle>Início</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>11/09/2019 11:24:25</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="clock-end" size={25} color="#555" />
        <DescriptTitle>Fim</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>11/09/2019 11:24:25</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="map-marker-distance" size={25} color="#555" />
        <DescriptTitle>Distância Percorrida</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>89 km</InfoDescriptText>
      </InfoBoxDescript>

      <Separator />
      <BoxTripDetail>
        <Icon name="school" size={25} color="#555" />
        <DescriptTitle>Total de Alunos</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>16 alunos</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="bus-school" size={25} color="#555" />
        <DescriptTitle>Alunos Transportados</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>8 alunos</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="not-equal-variant" size={25} color="#555" />
        <DescriptTitle>Alunos Faltantes</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>6 alunos</InfoDescriptText>
      </InfoBoxDescript>

      <CloseBox onPress={onClose}>
        <CloseTitle>Fechar</CloseTitle>
      </CloseBox>
    </ContainerInfo>
  );
}
