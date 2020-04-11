import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ContainerForm,
  BoxInput,
  InputHere,
  LoginButton,
  TextButton,
  RegisterButton,
  TextRegister,
  LogoBox,
  Logo,
} from './styles';

import logoapp from '../../assets/logoapp.png';
import wp from '../../assets/van.jpg';

export default function Login({navigation}) {
  return (
    <Container source={wp} blurRadius={1.2}>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />

      <LogoBox>
        <Logo source={logoapp} />
      </LogoBox>

      <ContainerForm>
        <BoxInput>
          <MDIcon name="account" size={18} color="#999" />
          <InputHere placeholder="Usuário" keyboardType="email-address" />
        </BoxInput>

        <BoxInput>
          <MDIcon name="lock" size={18} color="#999" />
          <InputHere placeholder="Senha" />
        </BoxInput>

        <LoginButton onPress={() => navigation.navigate('Main')}>
          <TextButton>Entrar</TextButton>
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <TextRegister>Cadastro de Motorista</TextRegister>
        </RegisterButton>
      </ContainerForm>
    </Container>
  );
}
