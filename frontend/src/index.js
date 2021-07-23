import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core/styles";
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import './index.css';
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(88, 191, 114)',
    },
    secondary: {
      main: 'rgb(230, 193, 198)',
    },
  },
});

ReactDOM.render(<Provider store={store}> <MuiThemeProvider theme={theme}><App/></MuiThemeProvider></Provider>, document.getElementById('root'));
