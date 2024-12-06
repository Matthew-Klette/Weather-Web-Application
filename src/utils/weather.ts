const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};