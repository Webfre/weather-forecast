import { DateTime } from 'luxon';

// Data for the request
// const API_KEY = '3a749a9f70533b09e60e09bf1ec9a70f'; //! free
const API_KEY_2 = '1fa9ff4126d95b8db54f3897a208e91c'; //! limited
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Request to the openweathermap.org
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY_2 });

  return fetch(url)
    .then(res => res.json());
};

// Getting data from the API
const formatWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return { lat, lon, temp, feels_like, temp_max, temp_min, humidity, name, dt, country, sunrise, sunset, speed, details, icon, pressure };
};

// Weather forecast by time
const formatForecast = (data) => {
  let { timezone, daily, hourly } = data;

  // Daily weather forecast
  daily = daily.slice(1, 6).map(item => {
    return {
      title: formatToLocalTime(item.dt, timezone, 'ccc'),
      temp: item.temp.day,
      icon: item.weather[0].icon,
    };
  });

  // Hourly weather forecast
  hourly = hourly.slice(1, 6).map(item => {
    return {
      title: formatToLocalTime(item.dt, timezone, 'hh:mm a'),
      temp: item.temp,
      icon: item.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// Formatting time to local format
const formatToLocalTime = (
  sec,
  zone,
  format = 'cccc, dd LLL yyyy\' | Local time: \'hh:mm a'
) => DateTime.fromSeconds(sec).setZone(zone).toFormat(format);

const getFormattedWeatherData = async (searchParams) => {
  const formattedWeather = await getWeatherData('weather', searchParams)
    .then(data => formatWeather(data));

  const { lat, lon } = formattedWeather;

  // Getting data based on coordinates
  const formattedForecast = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
    units: searchParams.units,
  }).then(formatForecast);

  return { ...formattedWeather, ...formattedForecast };
};

const iconURL = (codeIcon) => {
  return `https://openweathermap.org/img/wn/${codeIcon}@2x.png`;
};

export default getFormattedWeatherData;
export { formatToLocalTime, iconURL };