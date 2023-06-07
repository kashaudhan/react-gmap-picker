import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Picker from '../src/Picker';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Picker
        defaultLocation={{ lat: 13.4, lng: 77.0 }}
        zoom={10}
        style={{ height: '700px' }}
        onChangeLocation={() => {}}
        onChangeZoom={() => {}}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
