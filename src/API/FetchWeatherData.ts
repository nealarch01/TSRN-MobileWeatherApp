import axios from 'axios';
import { writeFileSync } from 'fs';

import CoordinatesMap, { CoordinatesMap_Provider } from './Coordinates/CoordinatesMap';
import config from './config.json';

const coordinates_map = new CoordinatesMap();

// if there is no data returned from the api call then return null
export async function FetchWeatherData_Hourly(city_name: string, state_name: string): Promise<object | null> {
    const lng: number = coordinates_map.getLongitude(city_name, state_name);
    const lat: number = coordinates_map.getLatitude(city_name, state_name);
    const parts: string = 'daily,minutely'; // exclude fields are delimited by commas
    const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${Math.floor(lat)}&lon=${Math.floor(lng)}&exclude=${parts}&units=imperial&appid=${config.API_Key}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        // writeFileSync('../../Logs/weather_data_errorLog.json', JSON.stringify(err, null, 4)); // uncomment to write to json file
        console.log('An error has occured trying to get weather data (GetWeatherData.ts; FetchWeatherData_Hourly)');
        return null;
    }
}

export async function FetchWeatherData_Daily(city_name: string, state_name: string): Promise<object | null> {
    const lng: number = coordinates_map.getLongitude(city_name, state_name);
    const lat: number = coordinates_map.getLatitude(city_name, state_name);
    const parts: string = 'minutely,hourly';
    const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${Math.floor(lat)}&lon=${Math.floor(lng)}&exclude=${parts}&units=imperial&appid=${config.API_Key}`;
    try {
        const response = await axios.get(url);
        // console.log(url);
        return response.data;
    } catch (err) {
        // writeFileSync('../../Logs/weather_data_errorLog.json', JSON.stringify(err, null, 4)); // uncomment to write to json file
        // console.log(url);
        console.log('An error has occured trying to get weather data (GetWeatherData.ts; FetchWeatherData_Daily)');
        return null;
    }
}

export async function FetchWeatherData_Minutely(city_name: string, state_name: string): Promise<object | null> {
    const lng: number = coordinates_map.getLongitude(city_name, state_name);
    const lat: number = coordinates_map.getLatitude(city_name, state_name);
    const parts: string = 'hourly,daily';
    const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${Math.floor(lat)}&lon=${Math.floor(lng)}&exclude=${parts}&units=imperial&appid=${config.API_Key}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        // writeFileSync('../../Logs/weather_data_errorLog.json', JSON.stringify(err, null, 4)); // uncomment to write to json file
        console.log('An error has occured trying to get weather data (GetWeatherData.ts; FetchWeatherData_Daily)');
        return null;
    }
}