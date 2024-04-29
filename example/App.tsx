import { useState } from 'react';
import { Picker } from '../src';
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
