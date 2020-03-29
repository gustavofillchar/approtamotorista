import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '~/pages/Main';
import Register from '~/pages/Register';
import VehicleRegister from '~/pages/VehicleRegister';
import TestRoutes from '~/pages/TestRoutes';

const Routes = createAppContainer(
  createStackNavigator(
    {
      TestRoutes: {
        screen: TestRoutes,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTitle: 'Teste das Rotas [temp]',
          headerTintColor: '#fff',
        },
      },
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
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTitle: 'Resumo da Viagem',
          headerTintColor: '#fff',
        },
      },
    },

    {
      initialRouteName: 'TestRoutes',
      defaultNavigationOptions: {
        headerBackTitle: 'Voltar',
        headerTruncatedBackTitle: 'Voltar',
      },
    },
  ),
);

export default Routes;
