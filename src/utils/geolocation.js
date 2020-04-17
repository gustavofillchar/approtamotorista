import Geolocation from '@react-native-community/geolocation';

export async function getCurrentLocation() {
  const geolocationPromise = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(position => {
      const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      resolve(location);
    });
  });
  return geolocationPromise;
}
