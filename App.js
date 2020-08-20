import "react-native-gesture-handler";
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from "@react-navigation/native";
import OfflineNotice from './src/component/OfflineNotice';
import MainNavigator from './src/navigator/MainNavigator';

import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
        <OfflineNotice />
      </NavigationContainer>
    </Provider>
  );

}

export default App;