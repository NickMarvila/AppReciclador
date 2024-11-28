/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App'; //chama o App
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App); //registra um componente a ser exibido quando roda App.js
