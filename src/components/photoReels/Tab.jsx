import React, { useState } from 'react';

const Tab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className={`flex justify-center items-center px-6 py-2 font-medium text-sm border-2 rounded-full ${
            activeTab === 'Photos'
              ? 'text-white bg-black border-black'
              : 'text-black border-black hover:bg-black hover:text-white'
          }`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          className='h-4 w-4 m-2'>
            <path fill="currentColor" d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
        </svg>
        <button
          onClick={() => setActiveTab('Photos')}
          className='text-xl'
        >
          Photos
        </button>
      </div>
      <div className={`flex justify-center items-center px-6 py-2 font-medium text-sm border-2 rounded-full ml-4 ${
            activeTab === 'Reels'
              ? 'text-white bg-black border-black'
              : 'text-black border-black hover:bg-black hover:text-white'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            className='h-4 w-4 m-2'>
            <path fill="currentColor" d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
            </svg>
        <button
          onClick={() => setActiveTab('Reels')}
          className='text-xl'
        >
          Reels
        </button>
      </div>
    </div>
  );
};

export default Tab;
