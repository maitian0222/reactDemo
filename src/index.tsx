import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import WorkCalendar from './Calendar1/Calendar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
