import React from 'react';

import { iconURL } from '../Services/weatherService';

function Forecast({ title, items }) {
  return (
    <>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>
          {title}
        </p>
      </div>
      <hr className='my-2' />

      <div className='flex flex-row items-center justify-between text-white'>
        {
          items.map((item, id) => (
            <div key={id} className='flex flex-col items-center'>
              <p className='font-light text-sm'>
                {item.title}
              </p>
              <img
                src={iconURL(item.icon)}
                alt='icon weather'
                className='w-12 my-1'
              />
              <p className='font-medium'>{`${+item.temp.toFixed()}°`}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Forecast;