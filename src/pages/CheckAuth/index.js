import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles';
import {getTokenFromStorage} from '~/storage/auth';

export default function CheckAuth({navigation}) {
  useEffect(() => {
    async function checkAuth() {
      if (await getTokenFromStorage()) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    }
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ActivityIndicator size={40} color="#C10C19" />
    </Container>
  );
}
