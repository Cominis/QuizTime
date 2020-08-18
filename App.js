import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Platform, Button, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import OfflineNotice from './src/component/OfflineNotice';
import HomeScreen from './src/screen/HomeScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import QuestionScreen from './src/screen/QuestionScreen';
import ResultsScreen from './src/screen/ResultsScreen';
import CategoriesScreen from './src/screen/CategoriesScreen';
import QuizScreen from './src/screen/QuizScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        headerRight: () => (
          <Pressable
            style={_styles.icon}
            onPress={() => navigation.navigate('Settings')}
            android_ripple
          >
            <Icon
              name="settings"
              size={30}
              color="#000"
            />
          </Pressable>
        )
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        initialParams={{ answeredQuestions: new Array(10).fill(false) }}
      />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerRight: () => null }}
      />
    </Stack.Navigator>
  );
};

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <OfflineNotice />
    </NavigationContainer>
  );

}

export default App;

const _styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})