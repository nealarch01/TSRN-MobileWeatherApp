import FormKey from '../FormKey';

import coordinates from './coordinates.json';

export interface CoordinatesMap_Provider {
    longitude: number,
    latitude: number
}

interface CoordinatesElement_Provider {
    city: string, 
    state: string, 
    longitude: number, 
    latitude: number
}

class CoordinatesMap {
    private cmap: Map<string, CoordinatesMap_Provider>;
    constructor() {
        this.cmap = new Map<string, CoordinatesMap_Provider>();
        coordinates.forEach((element: CoordinatesElement_Provider) => {
            this.cmap.set(`${FormKey(element.city, element.state)}`, {
                longitude: element.longitude,
                latitude: element.latitude
            });
        });
    }
    // bound map to class (one initialization)
    getLongitude(city_name: string, state_name: string): number {
        const key: string = FormKey(city_name, state_name);
        return this.getLongitudeFromKey(key);
    }

    getLatitude(city_name: string, state_name: string): number {
        const key: string = FormKey(city_name, state_name);
        return this.getLatitudeFromKey(key);
    }


    // pass in key string, overloaded 
    getLongitudeFromKey(key: string): number {
        const location_data = this.cmap.get(key);
        if (location_data === undefined) {
            return NaN;
        }
        if (location_data.longitude === undefined) {
            return NaN;
        }
        return location_data.longitude;
    }

    getLatitudeFromKey(key: string): number {
        const location_data = this.cmap.get(key);
        if (location_data === undefined) {
            return NaN;
        }
        if (location_data.latitude === undefined) {
            return NaN;
        }
        return location_data.latitude;
    }
}

export default CoordinatesMap;