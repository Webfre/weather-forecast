import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!');
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnit = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flow-row w-3/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type='text'
          placeholder='Search for city....'
          onKeyUp={handleKeyUp}
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          onClick={handleUnit}
          name='metric'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
        >
          °C
        </button>
        <p className='text-xl text-white mx-2'>|</p>
        <button
          onClick={handleUnit}
          name='imperial'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Input;