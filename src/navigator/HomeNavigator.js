import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screen/HomeScreen';
import HistoryScreen from '../screen/HistoryScreen';

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

export default HomeNavigator;