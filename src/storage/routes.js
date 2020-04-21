import AsyncStorage from '@react-native-community/async-storage';

export async function getRoutesFromStorage() {
  const routes = JSON.parse(await AsyncStorage.getItem('routes')) || [];
  return Object.values(routes);
}

export async function storeRouteInStorage(route) {
  const previousRoutes = await getRoutesFromStorage();
  previousRoutes[route.id] = route;
  await AsyncStorage.setItem('routes', JSON.stringify(previousRoutes));
}

export async function getEspecificRouteFromStorage(routeId) {
  const routes = await getRoutesFromStorage();
  return routes[routeId];
}
