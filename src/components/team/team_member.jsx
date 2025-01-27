import { useState } from "react";

export function TeamMember({ name, role, imageUrl, onClick }) {
    return (
        <div className="relative group" onClick={onClick}>
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={imageUrl}
            alt={`${name}, ${role}`}
            className="w-full h-[400px] object-cover object-center"
          />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max">
          <div className="bg-white rounded-full border-black border-[1.2px] px-6 py-3 shadow-lg">
            <h3 className="text-gray-900 font-medium text-center">{name}</h3>
            <p className="text-gray-600 text-sm text-center">{role}</p>
          </div>
        </div>
      </div>
    );
  }
  