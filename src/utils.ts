import { Location } from './types';

export const isMapLoaded = (id: string): boolean => {
  const scripts: HTMLCollectionOf<HTMLScriptElement> = document.head.getElementsByTagName(
    'script'
  );
  for (let i: number = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute('id') === id) {
      return true;
    }
  }

  return false;
};

export const isValidLocation = (location: Location) => {
  return (
    location && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180
  );
};
