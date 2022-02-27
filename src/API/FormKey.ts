function FormKey(city_name: string, state_name: string): string {
    city_name = city_name.replace(' ', '');
    state_name = state_name.replace(' ', '');
    city_name = city_name.toLowerCase();
    state_name = state_name.toLowerCase();
    return `${city_name},${state_name}`;
}

export default FormKey;