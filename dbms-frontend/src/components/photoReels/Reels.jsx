import React, { useState } from 'react';
import reels from '../../utils/reels.json';
import { FiX, FiHeart, FiMessageCircle, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../Button';

const Reels = () => {
  const [selectedReel, setSelectedReel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedReels, setLikedReels] = useState(new Set());

  const handleLike = (reelId) => {
    setLikedReels(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(reelId)) {
        newLiked.delete(reelId);
      } else {
        newLiked.add(reelId);
      }
      return newLiked;
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedReel) {
      setCurrentImageIndex((prev) => 
        prev === selectedReel.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedReel) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedReel.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-[550px] mx-auto px-4 space-y-12">
        {reels.map((reel) => (
          <article 
            key={reel.id} 
            className="bg-white rounded-[30px] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                  <img 
                    src={reel.photographerAvatar} 
                    alt={reel.photographer} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{reel.photographer}</h3>
                  <p className="text-gray-500 text-xs">{reel.location}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReel(reel)}
                className="text-xs"
              >
                View Details
              </Button>
            </div>

            {/* Image */}
            <div 
              className="relative aspect-square bg-gray-100 cursor-pointer"
              onClick={() => setSelectedReel(reel)}
            >
              <img 
                src={reel.images[0]} 
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                <p className="text-xs font-medium">1/{reel.images.length}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(reel.id)}
                  className={`p-2 rounded-full transition-colors ${
                    likedReels.has(reel.id) 
                      ? 'text-red-500 hover:bg-red-50' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FiHeart 
                    className={`w-6 h-6 ${likedReels.has(reel.id) ? 'fill-current' : ''}`}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiMessageCircle className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiShare2 className="w-6 h-6" />
                </button>
              </div>
              <div>
                <p className="font-medium text-sm">{reel.likes + (likedReels.has(reel.id) ? 1 : 0)} likes</p>
                <h2 className="font-medium mt-1">{reel.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{reel.description}</p>
                <p className="text-xs text-gray-400 mt-2">{reel.date}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reel Modal */}
      {selectedReel && (
        <div 
          className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedReel(null);
            setCurrentImageIndex(0);
          }}
        >
          <button 
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            onClick={() => {
              setSelectedReel(null);
              setCurrentImageIndex(0);
            }}
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8" onClick={e => e.stopPropagation()}>
            <div className="flex-1 relative">
              <img 
                src={selectedReel.images[currentImageIndex]} 
                alt={`${selectedReel.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-[30px]"
              />
              {selectedReel.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <p className="text-sm font-medium">
                      {currentImageIndex + 1}/{selectedReel.images.length}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:w-80 p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                  <img src={selectedReel.photographerAvatar} alt={selectedReel.photographer} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedReel.photographer}</h3>
                  <p className="text-sm text-gray-500">{selectedReel.location}</p>
                </div>
              </div>
              
              <h2 className="text-xl font-light mb-4">{selectedReel.title}</h2>
              <p className="text-gray-600 text-sm mb-6">{selectedReel.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Camera:</span> {selectedReel.camera}
                </div>
                <div>
                  <span className="font-medium">Lens:</span> {selectedReel.lens}
                </div>
                <div>
                  <span className="font-medium">Settings:</span> {selectedReel.settings}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {selectedReel.date}
                </div>
                <div>
                  <span className="font-medium">Likes:</span> {selectedReel.likes + (likedReels.has(selectedReel.id) ? 1 : 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;
