import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import TopButtons from './Components/TopButtons';
import Input from './Components/Input';
import TimeAndLocation from './Components/TimeAndLocation';
import Temperature from './Components/Temperature';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/weatherService';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: 'Moscow' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location';
      toast.info('Fetching weather for ' + message);

      await getFormattedWeatherData({ ...query, units })
        .then(data => {
          toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`);
          setWeather(data);
        });
    };

    fetchWeather();
  }, [query, units]);

  const formatBg = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const hold = units === 'metric' ? 10 : 45;
    if (weather.temp <= hold) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700';
  };

  return (
    <div className={`mx-auto max-w-screen-md mt-14 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBg()}`}>
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      {
        weather &&
        (
          <>
            <TimeAndLocation weather={weather} />
            <Temperature weather={weather} />
            <Forecast title='hourly forecast' items={weather.hourly} />
            <Forecast title='daily forecast' items={weather.daily} />
          </>
        )
      }
      <ToastContainer
        autoClose={4000}
        theme='colored'
        newestOnTop={true} />
    </div>
  );
}

export default App;