import React, { useState } from 'react';
import photos from '../../utils/photos.json';

const Photos = () => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <>
      <div className='grid grid-cols-12 gap-[2rem] max-2xl:px-8 mx-auto max-w-[1450px]'>
        {(photos.length <= 6 || viewAll ? photos : photos.slice(0, 6)).map((photo, index) => (
          <div 
            key={index} 
            className='col-span-4 max-lg:col-span-6 max-sm:col-span-12'
          >
            <img 
              src={photo.img} 
              alt={`Photo ${index + 1}`}
              className='max-[400px]:w-[320px] w-full aspect-square rounded-md'
            />
          </div>
        ))}
      </div>

      {photos.length > 6 && (
        <div className="text-center mt-8 mb-12">
          <button 
            className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors tracking-wider"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? 'View Less' : 'View All'}
          </button>
        </div>
      )}
    </>
  );
};

export default Photos;