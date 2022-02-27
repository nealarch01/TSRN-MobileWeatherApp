import React, { Fragment } from 'react';
import {
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import { FetchWeatherData_Daily, FetchWeatherData_Hourly } from '../API/FetchWeatherData';
import CoordinatesMap from '../API/Coordinates/CoordinatesMap';

const m = new CoordinatesMap();

interface WeatherCardView_Provider {
    city_name: string,
    state_name: string,
    weather_description?: string,
    current_temperature?: number,
    temperature_high?: number,
    temperature_low?: number,
    updateLoading?(): void
}

interface WeatherCard_Provider {
    city_name: string,
    state_name: string
}

interface APIData_Provider {
    weatherDescription: string,
    currentTemperature: number,
    temperatureHigh: number,
    temperatureLow: number
}

const WeatherCard: React.FC<WeatherCard_Provider> = (props) => {
    const [location_weather_data, SetLocationWeatherData] = React.useState<APIData_Provider | null>(null);
    // const [isLoading, SetLoading] = React.useState<boolean>(true);
    const [isLoaded, SetLoaded] = React.useState<boolean>(true);
    React.useEffect(() => {
        async function assignWeatherData(): Promise<void> {
            const data: any = await FetchWeatherData_Daily(props.city_name, props.state_name);
            if (data === null) return;
            const current_day_data = data.daily[0];
            if (current_day_data === undefined || current_day_data === null) return;
            const formattedDescription = (): string => {
                var temp_description = current_day_data.weather[0].description.split(' ');
                var formatted_string: string = '';
                temp_description.forEach((word: string, index: number) => {
                    var updated_word: string;
                    updated_word = word.charAt(0).toUpperCase() + word.slice(1);
                    formatted_string += updated_word;
                    if (index < temp_description.length - 1) formatted_string += ' ';
                });
                return formatted_string;
            }
            const api_data: APIData_Provider = {
                weatherDescription: formattedDescription(),
                currentTemperature: Math.floor(data.current.temp),
                temperatureHigh: Math.floor(current_day_data.temp.max),
                temperatureLow: Math.floor(current_day_data.temp.min),
            }
            SetLocationWeatherData(api_data);
            SetLoaded(true);
        }

        if (location_weather_data === null || isLoaded === false) {
            assignWeatherData();
        }
    }, [isLoaded]); // only run once by setting zero dependencies
    function changeLoadingState() {
        SetLoaded(false);
    }
    return (
        <>
            {
                (location_weather_data === null)
                    ? <WeatherCardView
                        city_name={props.city_name}
                        state_name={props.state_name}
                    />
                    : <WeatherCardView
                        city_name={props.city_name}
                        state_name={props.city_name}
                        weather_description={location_weather_data.weatherDescription}
                        current_temperature={location_weather_data.currentTemperature}
                        temperature_high={location_weather_data.temperatureHigh}
                        temperature_low={location_weather_data.temperatureLow}
                        updateLoading={changeLoadingState}
                    />
            }
        </>
    );
}

// This view will contain the scrollview of objects
const WeatherCardView: React.FC<WeatherCardView_Provider> = ({ city_name = '', state_name = '', weather_description = '', current_temperature = NaN, temperature_high = NaN, temperature_low = NaN, updateLoading = () => {} }) => {
    // on click => go to open card, by passing city_name and state name
    return (
        <TouchableOpacity style={[styles.CardContainer]} onPress={() => updateLoading()}>
            <View style={[styles.HorizontalView]}>
                <View style={[styles.VerticalStack]}>
                    <Text style={[styles.HeaderCityText]}>{city_name}</Text>
                    <Text style={[styles.CurrentTimeText]}>{'11:14 PM'}</Text>
                </View>
                <View style={{ flex: 1 }} />
                {
                    (isNaN(current_temperature)) 
                        ? <Text style={[styles.CurrentWeatherText]}></Text>
                        : <Text style={[styles.CurrentWeatherText]}>{current_temperature}º</Text>
                }
            </View>
            <View style={{ flex: 1 }} />
            <View style={[styles.HorizontalView]}>
                <Text style={[styles.CurrentTimeText]}>{weather_description}</Text>
                <View style={{ flex: 1 }} />
                <Text style={[styles.HighLowText]}>H: {`${temperature_high}º`}</Text>
                <Text style={{ paddingLeft: 5, paddingRight: 5 }}></Text>
                <Text style={[styles.HighLowText]}>L: {`${temperature_low}º`}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    CardContainer: {
        height: 120,
        width: '100%',
        borderRadius: 18,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#45b3e0',
        marginTop: 5,
        marginBottom: 5,
    },
    HorizontalView: {
        flexDirection: 'row',
        width: '100%',
        borderColor: 'black',
        borderWidth: 0,
    },
    VerticalStack: {
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 0,
    },
    HeaderCityText: {
        fontSize: 28,
        color: 'white',
        fontWeight: '700',
    },
    CurrentWeatherText: {
        fontSize: 48,
        fontWeight: '400',
        color: 'white',
        textAlign: 'right',
    },
    CurrentTimeText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
    HighLowText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
        paddingTop: 2,
    },

});

export default WeatherCard;