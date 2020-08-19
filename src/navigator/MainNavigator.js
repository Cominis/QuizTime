import React from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import getHeaderTitle from '../helper/GetHeaderTitle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QuizNavigator from '../navigator/QuizNavigator';
import HomeNavigator from '../navigator/HomeNavigator';
import { StyleSheet } from 'react-native';

import QuestionScreen from '../screen/QuestionScreen';
import CategoriesScreen from '../screen/CategoriesScreen';
import SettingsScreen from '../screen/SettingsScreen';


const Stack = createStackNavigator();
const MainNavigator = () => {
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

export default MainNavigator;

const _styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})