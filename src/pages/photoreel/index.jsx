import React, { useState } from 'react';

import Photos from '../../components/photoReels/Photos';
import Reels from '../../components/photoReels/Reels';
import Tab from '../../components/photoReels/Tab';

const PhotoReels = () => {
  const [activeTab, setActiveTab] = useState('Photos'); // Default to Photos tab

  // Function to render tab content based on active tab
  const renderTabContent = () => {
    if (activeTab === 'Photos') {
      return <Photos />;
    }
    return <Reels />;
  };

  return (
    <>
      {/* Header Section */}
      <div className="mt-11 flex flex-col justify-center items-center gap-y-4 px-4 sm:px-6 lg:px-8">
        <span className="text-center font-bold text-3xl border-[1.2px] border-black rounded-full px-8 py-3 w-auto sm:text-4xl lg:text-5xl">
          Photography Feed
        </span>
        <span className="text-md opacity-60 sm:text-lg lg:text-xl lg:max-w-2xl text-center">
          Explore amazing shots and stories from our talented photographers
        </span>
      </div>

      {/* Tabs Section */}
      <div className="mt-11">
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content Section */}
      <div>
        {renderTabContent()}
      </div>
    </>
  );
};

export default PhotoReels;
