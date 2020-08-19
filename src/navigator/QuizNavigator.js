import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import QuizScreen from '../screen/QuizScreen';
import ResultsScreen from '../screen/ResultsScreen';

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

export default QuizNavigator;