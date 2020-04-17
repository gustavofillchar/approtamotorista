import React, {useEffect, useState} from 'react';

import {
  Container,
  MapBox,
  Title,
  Info,
  BoxTripDetail,
  DescriptTitle,
  InfoBoxDescript,
  InfoDescriptText,
  Separator,
  CloseTitle,
  CloseBox,
  ContainerInfo,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import {fetchUserData} from '~/services/api';
import {storeUserDataInStorage, getUserDataFromStorage} from '~/storage/user';
import {getCurrentLocation} from '~/utils/geolocation';
import {ActivityIndicator} from 'react-native';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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

  return (
    <Container>
      <MapBox>
        {currentLocation ? (
          <MapView
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0102,
              longitudeDelta: 0.0102,
            }}
            style={{height: '100%', width: '100%'}}>
            <Marker title="Sua posição atual" coordinate={currentLocation} />
          </MapView>
        ) : (
          <ActivityIndicator size={20} />
        )}
      </MapBox>

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

        <CloseBox onPress={() => navigation.navigate('Login')}>
          <CloseTitle>Fechar</CloseTitle>
        </CloseBox>
      </ContainerInfo>
    </Container>
  );
}
