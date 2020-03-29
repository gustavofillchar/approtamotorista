import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '~/pages/Main';
import Register from '~/pages/Register';
import VehicleRegister from '~/pages/VehicleRegister';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Register: {
        screen: Register,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTitle: 'Cadastro do Motorista',
          headerTintColor: '#fff',
        },
      },
      VehicleRegister: {
        screen: VehicleRegister,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTitle: 'Cadastro do Veículo',
          headerTintColor: '#fff',
        },
      },
      Main: {
        screen: Main,
      },
    },

    {
      initialRouteName: 'Register',
      defaultNavigationOptions: {
        headerBackTitle: 'Voltar',
        headerTruncatedBackTitle: 'Voltar',
      },
    },
  ),
);

export default Routes;
