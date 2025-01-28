import React, { useState } from 'react';
import photos from '../../utils/photos.json';
import Button from '../Button';
import { FiX } from 'react-icons/fi';

const Photos = () => {
  const [viewAll, setViewAll] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [category, setCategory] = useState('View all');

  // Categories similar to team tabs
  const categories = [
    { name: 'View all', href: '#' },
    { name: 'Nature', href: '#' },
    { name: 'Portrait', href: '#' },
    { name: 'Street', href: '#' },
    { name: 'Architecture', href: '#' },
    { name: 'Events', href: '#' }
  ];

  // Filter photos based on selected category
  const filteredPhotos = category === 'View all' 
    ? photos 
    : photos.filter(photo => photo.category === category);

  // Determine photos to display based on viewAll state
  const photosToDisplay = viewAll ? filteredPhotos : filteredPhotos.slice(0, 6);

  return (
    <div className="py-12 bg-white">
      {/* Categories/Tabs */}
      <div className="mb-12">
        <div className="sm:hidden px-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setViewAll(false); // Reset viewAll when changing category
            }}
            className="block w-full rounded-full border-gray-200 py-2 pl-4 pr-10 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            {categories.map((cat) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex justify-center -mb-px space-x-8">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategory(cat.name);
                    setViewAll(false); // Reset viewAll when changing category
                  }}
                  className={`
                    whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm
                    ${category === cat.name
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photosToDisplay.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="overflow-hidden rounded-[30px] bg-gray-100">
                <img 
                  src={photo.img} 
                  alt={photo.title}
                  className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max">
                <div className="bg-white rounded-full border-black border-[1.2px] px-6 py-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
                      <img src={photo.photographerAvatar} alt={photo.photographer} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium text-sm">{photo.title}</h3>
                      <p className="text-gray-600 text-xs">By {photo.photographer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filteredPhotos.length > 6 && !viewAll && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => setViewAll(true)}
              variant="outline"
              size="md"
              className="border-black text-black rounded-full px-8"
            >
              Load More Photos
            </Button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            onClick={() => setSelectedPhoto(null)}
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8" onClick={e => e.stopPropagation()}>
            <div className="flex-1">
              <img 
                src={selectedPhoto.img} 
                alt={selectedPhoto.title}
                className="w-full h-full object-contain rounded-[30px]"
              />
            </div>
            <div className="w-full md:w-80 p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                  <img src={selectedPhoto.photographerAvatar} alt={selectedPhoto.photographer} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedPhoto.photographer}</h3>
                  <p className="text-sm text-gray-500">{selectedPhoto.location}</p>
                </div>
              </div>
              
              <h2 className="text-xl font-light mb-4">{selectedPhoto.title}</h2>
              <p className="text-gray-600 text-sm mb-6">{selectedPhoto.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Camera:</span> {selectedPhoto.camera}
                </div>
                <div>
                  <span className="font-medium">Lens:</span> {selectedPhoto.lens}
                </div>
                <div>
                  <span className="font-medium">Settings:</span> {selectedPhoto.settings}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {selectedPhoto.category}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {selectedPhoto.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;