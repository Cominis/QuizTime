import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Pressable
} from "react-native";
import { getData } from '../helper/Storage';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressIndicator from '../component/ProgressIndicator';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HistoryScreen = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [activeSections, setActiveSections] = useState([]);

    const { navigation } = props;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true);
            const history = await getData('history') || [];
            setHistory(history);
            setIsLoading(false);
        });

        return unsubscribe;
    }, [navigation]);


    const _renderHeader = section => {
        return (
            <View style={_styles.header}>
                <Text style={[_styles.headerText, _styles.bold]}>
                    {section.category}
                </Text>
                <Text style={_styles.headerText}>
                    {section.date}
                </Text>
            </View>
        );
    };

    const _renderContent = section => {
        return (
            <View style={_styles.content}>
                <View style={_styles.contentResult}>
                    <AwesomeIcon name='check' size={30} color='lightgreen' />
                    <Text style={_styles.contentText}>
                        {section.correct}
                    </Text>
                </View>
                <View style={_styles.contentResult}>
                    <AwesomeIcon name='remove' size={30} color='red' />
                    <Text style={_styles.contentText}>
                        {section.incorrect}
                    </Text>
                </View>
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };


    return (
        <View styles={_styles.container}>
            {isLoading
                ? <ProgressIndicator />
                : <Accordion
                    sections={history}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    duration={400}
                    touchableComponent={Pressable}
                />}
        </View>);

}

export default HistoryScreen;

HistoryScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        padding: 20,
        backgroundColor: '#555',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    contentResult: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    contentText: {
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});