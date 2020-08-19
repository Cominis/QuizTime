import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from "@react-navigation/native";
import OfflineNotice from './src/component/OfflineNotice';
import MainNavigator from './src/navigator/MainNavigator';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
      <OfflineNotice />
    </NavigationContainer>
  );

}

export default App;