import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={40} color="#C10C19" />
    </View>
  );
}
