import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';

ReactDOM.render(
  <React.StrictMode>
    <Thing />
  </React.StrictMode>,
  document.getElementById('root')
);
