import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StatusBar, ActivityIndicator} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';
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
  const [userName, setUserName] = useState(''); // input do usuario
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false); // define o activityIndicator do botão enquanto a função executa
  const [hasError, setHasError] = useState(false); // verifica se retornou erro e qual erro
  const [errorMessage, setErrorMessage] = useState(''); // mensagem para tratamento de erros
  const [numberClick, setNumberClick] = useState(0);
  const [editable, setEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = useCallback(() => {
    setLogging(true);
    if (hasError) {
      setHasError(false);
    }

    api
      .post('general/driver/login', {
        email: userName,
        password: password,
      })
      .then(async response => {
        await AsyncStorage.setItem('USER_DATA', JSON.stringify(response.data));
        const user = JSON.parse(await AsyncStorage.getItem('USER_DATA')) || {};
        navigation.replace('Main', {user});
        setUserName('');
        setPassword('');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
        setHasError(true);
        setLogging(false);
      });
  }, [hasError, navigation, password, userName]);

  return (
    <Container source={wp} blurRadius={1.2}>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />

      <LogoBox>
        <Logo source={logoapp} />
      </LogoBox>

      <ContainerForm>
        <BoxInput>
          <MDIcon name="account" size={18} color="#999" />
          <InputHere
            placeholder="Usuário"
            keyboardType="email-address"
            value={userName}
            onChangeText={entry => setUserName(entry)}
            autoCapitalize="none"
          />
        </BoxInput>

        <BoxInput>
          <MDIcon name="lock" size={18} color="#999" />
          <InputHere
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={entry => setPassword(entry)}
          />
        </BoxInput>

        <LoginButton onPress={loginUser}>
          {logging ? (
            <ActivityIndicator color="#fff" size={25} />
          ) : (
            <TextButton>Entrar</TextButton>
          )}
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <TextRegister>Cadastro de Motorista</TextRegister>
        </RegisterButton>
      </ContainerForm>
    </Container>
  );
}
