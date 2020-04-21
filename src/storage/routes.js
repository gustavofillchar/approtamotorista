import AsyncStorage from '@react-native-community/async-storage';

export async function getRoutesFromStorage() {
  const routes = JSON.parse(await AsyncStorage.getItem('routes')) || [];
  return Object.values(routes);
}

export async function storeRouteInStorage(route) {
  const previousRoutes = JSON.parse(await AsyncStorage.getItem('routes')) || {};
  console.tron('ROUTE: ', route);
  previousRoutes[route.id.toString()] = route;
  console.tron('STOREROUTE: ', previousRoutes);
  await AsyncStorage.setItem('routes', JSON.stringify(previousRoutes));
}

export async function getEspecificRouteFromStorage(routeId) {
  const routes = JSON.parse(await AsyncStorage.getItem('routes')) || {};
  return routes[routeId.toString()];
}
