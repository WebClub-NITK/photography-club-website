import React from 'react';
import { TeamMember } from './team_member';

export function TeamShowcase() {
  const teamMembers = [
    {
      name: 'Emily Donnavan',
      role: 'Product Lead',
      imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
    },
    {
      name: 'Jessica Dobrev',
      role: 'Backend Lead',
      imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
    },
    {
      name: 'Drew Cano',
      role: 'Head of UX',
      imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
    },
    {
        name: 'Emily Donnavan',
        role: 'Product Lead',
        imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
      },
      {
        name: 'Jessica Dobrev',
        role: 'Backend Lead',
        imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
      },
      {
        name: 'Drew Cano',
        role: 'Head of UX',
        imageUrl: '/src/assets/images/placeholder.jpg?height=400&width=300',
      },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
