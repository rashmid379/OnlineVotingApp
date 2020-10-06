import React from 'react';
import './App.css';
// need unstable_createMuiStrictModeTheme as createMuiTheme for findDOMNode issues
// https://github.com/mui-org/material-ui/issues/13394
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import { appStore } from './stores/appStore';
import { AppContainer } from './containers/AppContainer';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#C7E3CC',
        main: '#54A67E',
        dark: '#0C2D34',
        contrastText: '#fff',
      },
      secondary: {
        light: '#F5C522',
        main: '#EA8C27',
        dark: '#EA8C27',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={appStore}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
