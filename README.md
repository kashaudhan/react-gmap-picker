
# react-gmap-picker

React google maps location picker/marker with `Advanced Marker`


## Table of Contents

- [react-gmap-picker](#react-gmap-picker)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage/Examples](#usageexamples)
  - [Props](#props)

## Installation


Install react-gmap-picker and its dependeices
```sh
npm install --save react-gmap-picker
```
or
```sh
yarn add react-gmap-picker
```
## Usage/Examples

```jsx
import { useState } from 'react';
import { Picker } from 'react-gmap-picker';
import React from 'react';

const INITIAL_LOCATION = { lat: 13.4, lng: 77.0 };
const INITIAL_ZOOM = 10;

const API_KEY = process.env.API_KEY as string;

const App = () => {
  const [defaultLocation, setDefaultLocation] = useState(INITIAL_LOCATION);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const handleChangeLocation = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleChangeZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleResetLocation = () => {
    setDefaultLocation({ ...INITIAL_LOCATION });
    setLocation({ ...INITIAL_LOCATION });
    setZoom(INITIAL_ZOOM);
  };

  return (
    <div>
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitude:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitude:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />

      <div>
        <h4>Map 1 (roadmap)</h4>
        <Picker
          defaultLocation={defaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{ height: '700px' }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey={API_KEY}
        />
      </div>
    </div>
  );
};

export default App;
```


## Props

| Parameter | Type     | Default  | Description                |
| :-------- | :------- | ---------| :------------------------- |
| `apiKey` | `string` | **Required** | **Required**. Google maps API key |
| `defaultLocation` | `{lat: number; lng: number}` |  **Required** |  **Required**. Default coordinate. |
| `zoom` | `{lat: number; lng: number}` | 7 | Default coordinate. |
| `onChangeLocation` | `(lat: number, lng: number) => void` | null | Executes when location changes. |
| `onChangeZoom` | `(zoom: number) => void` | null | Executes when room level changes. |
| `style` | `any` | { width: '100%', height: '600px' } | Map container style. |
| `className` | `string` | undefined | Map className. |
| `mapTypeId` | [google.maps.MapTypeId](https://developers.google.com/maps/documentation/javascript/maptypes) | undefined | Map type you want to see. |

