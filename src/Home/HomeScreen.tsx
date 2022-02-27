import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    ListRenderItem,
    Animated
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherCard from '../Card/WeatherCard';

import SavedLocations from '../Storage/SampleList.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Load -> Store

const HomeScreen = () => {
    interface RenderWeatherCard_Provider {
        City: string,
        State: string,
    }

    const offset = React.useRef(new Animated.Value(0)).current;


    const renderItem: ListRenderItem<RenderWeatherCard_Provider> = ({ item }) => (
        <WeatherCard city_name={item.City} state_name={item.State} />
    );
    return (
        <SafeAreaView style={[styles.MainContainer]}>
            <View style={[styles.HomeContainer]}>
                <Text style={[styles.HeaderText]}>Current Weather</Text>
                <FlatList
                    data={SavedLocations}
                    renderItem={renderItem}
                    keyExtractor={(item: object, index: number) => `${index}`}
                    StickyHeaderComponent={stickySearchHeader}
                />
            </View>
        </SafeAreaView>
    )
}

const stickySearchHeader = () => {
    return (
        <View>
            <TextInput placeholder='Search for a city or airport' />
        </View>
    );
}

const stickyOptionsFooter = () => {
    return (
        <View style={[styles.OptionsView]}>
            <Ionicons name='reorder-three' size={30} color={'#FFFFFF'} />
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    HomeContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    SearchBarStyle: {
        height: 40,
        width: '100%',
        backgroundColor: 'gray',
    },
    HeaderText: {
        fontWeight: '600',
        fontSize: 36,
        color: '#FFFFFF',
    },
    OptionsView: {
        width: '100%', // should take up the entire bottom part of the screen
        alignSelf: 'flex-end',
    }
});

export default HomeScreen;