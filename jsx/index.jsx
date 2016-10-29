import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UITheme from './../jsx/constants/UITheme';
import App from './../jsx/components';

// Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
  <MuiThemeProvider muiTheme={getMuiTheme(UITheme)}>
    <App />
  </MuiThemeProvider>
), document.getElementById('app'));
