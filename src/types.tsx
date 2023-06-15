export type Location = {
  lat: number;
  lng: number;
};

export type PickerProps = {
  apiKey: string;
  defaultLocation: Location;
  zoom?: number;
  onChangeLocation?(lat: number, lng: number): void;
  onChangeZoom?(zoom: number): void;
  style?: any;
  className?: string;
  mapTypeId?: google.maps.MapTypeId;
  icon?: string | google.maps.Icon | google.maps.Symbol | null | undefined; // https://developers.google.com/maps/documentation/javascript/markers#icons
  alwaysCentered?: boolean
};