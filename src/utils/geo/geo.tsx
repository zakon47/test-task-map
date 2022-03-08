import { Coordinates } from "../../models/coordinates";

export const defaultCenter = {
  lat: 51.509865,
  lng: -0.118092,
};

export const getBrowserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          resolve({ lat, lng });
        },
        () => {
          reject(defaultCenter);
        }
      );
    } else {
      reject(defaultCenter);
    }
  });
};
