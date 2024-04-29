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

export const loadScript = (API_KEY: string) => {

  const el = document.getElementById("google-map");

  if(el) return;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
  script.setAttribute("type", "module");
  script.setAttribute('id', "google-map");
  document.head.appendChild(script);

  return new Promise<void>(resolve => {
    (window as any).initMap = function() {
      // JS API is loaded and available
      resolve()
    };
  });
};

export const isValidLocation = (location: Location) => {
  return (
    location && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180
  );
};
