import { useState } from 'react';
import { Picker } from '../src';
import React from 'react';

const INITIAL_LOCATION = { lat: 13.4, lng: 77.0 };
const INITIAL_ZOOM = 10;

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

      <div className="row">
        <div className="column">
          <h4>Map 1 (roadmap)</h4>
          <Picker
            defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: '700px' }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
          />
        </div>

        <div className="column">
          <h4>Map 2 (satellite)</h4>
          <Picker
            defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="satellite"
            style={{ height: '700px' }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            alwaysCentered={true}
            icon={
              'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            }
            apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
