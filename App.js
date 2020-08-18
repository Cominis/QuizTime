import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Platform, Button, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import getHeaderTitle from './src/helper/GetHeaderTitle';
import NetworkContext from './src/component/QuizContext';


import OfflineNotice from './src/component/OfflineNotice';
import HomeScreen from './src/screen/HomeScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import QuestionScreen from './src/screen/QuestionScreen';
import ResultsScreen from './src/screen/ResultsScreen';
import CategoriesScreen from './src/screen/CategoriesScreen';
import QuizScreen from './src/screen/QuizScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';



const QuizTab = createBottomTabNavigator();
const QuizNavigator = ({ route }) => {
  return (
    <NetworkContext.Provider value={route.params}>
      <QuizTab.Navigator>
        <QuizTab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused
                ? 'account-question'
                : 'account-question-outline';
              return <CommunityIcon name={iconName} size={size} color={color} />;
            },
          }}
        />
        <QuizTab.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused
                ? 'folder-information'
                : 'folder-information-outline';
              return <CommunityIcon name={iconName} size={size} color={color} />;
            },
          }}
        />
      </QuizTab.Navigator>
    </NetworkContext.Provider>
  );
}

const HomeTab = createBottomTabNavigator();
const HomeNavigator = () => {
  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: true,
      }}
    // tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    // }}
    >
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused
              ? 'home'
              : 'home-outline';
            return <CommunityIcon name={iconName} size={size} color={color} />;
          },
        }} />
      <HomeTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <CommunityIcon name='history' size={size} color={color} />;
          },
        }} />
    </HomeTab.Navigator>
  );
}

const Stack = createStackNavigator();
const StackNavigator = () => {
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
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route, 'Home'),
        })}
      />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen
        name="QuizNavigator"
        component={QuizNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route, 'Quiz'),
        })}
      />
      <Stack.Screen name="Question" component={QuestionScreen} />
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
      <StackNavigator />
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