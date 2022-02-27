import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveWeatherLocations(key: string, location_coordinates: any): Promise<boolean> {
    if(location_coordinates === null || location_coordinates === undefined) return false; // data was not successfully save
    if(key === '') return false;
    const data_string: string = JSON.stringify(location_coordinates); // data that is going to be stored into a json format needs to be converted into string, no formatting necessary
    return true; // successfully saved data to file
}