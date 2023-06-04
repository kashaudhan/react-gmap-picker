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

export const loadScript = (src: string, id: string) => {
  if (isMapLoaded(id)) {
    // Make sure the script is loaded
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  (document.querySelector('head') as any).appendChild(script);

  return new Promise<void>(resolve => {
    script.onload = () => {
      resolve();
    };
  });
};

export const isValidLocation = (location: Location) => {
  return (
    location && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180
  );
};
