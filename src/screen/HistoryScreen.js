import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ScrollView,
    Dimensions
} from "react-native";
import { getData } from '../helper/Storage';
import Accordion from 'react-native-collapsible/Accordion';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';

const LoadingPlaceholder = () => {
    return (
        <React.Fragment>
            {Array.apply(null, Array(10)).map((_, index) => (
                <Placeholder
                    key={index}
                    style={_styles.icon}
                    Animation={ShineOverlay}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={40} />
                </Placeholder>
            ))}
        </React.Fragment>
    );
};


const HistoryScreen = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [history, setHistory] = useState([]);
    const [activeSections, setActiveSections] = useState([]);

    const { navigation } = props;

    let emptyHistory = null;

    useLayoutEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true);
            const history = await getData('history') || [];
            setHistory(history);

            if (!history.length)
                setIsEmpty(true);
            else
                setIsEmpty(false);

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


    return (<ScrollView contentContainerStyle={isEmpty ? _styles.containerCenter : _styles.container}>
        {isLoading
            ? <LoadingPlaceholder />
            : isEmpty
                ? (<View style={_styles.center}>
                    <AwesomeIcon name='bed' size={50} color='black' />
                    <Text>History is empty!</Text>
                </View>)
                : (<Accordion
                    sections={history}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    duration={400}
                    touchableComponent={Pressable}
                />)}

    </ScrollView>);

}

export default HistoryScreen;

HistoryScreen.propTypes = {
    route: PropTypes.any,
    navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    containerCenter: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
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
    icon: {
        padding: 15,
    },
});