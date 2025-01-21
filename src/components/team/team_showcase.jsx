import React from 'react';
import { TeamMember } from './team_member';
import { TabContext } from '../../context/TabContext';
import { useContext } from 'react';

export function TeamShowcase() {
  const {teamMembers, activeItem,searchQuery} = useContext(TabContext);
  // getting the people whose team matches with the tab selected 
  const selectedTeamMembers = teamMembers.filter((member) => (member.team === activeItem))

  // check whether the view all tab is selected or not
  const membersToDisplay = activeItem === 'View all' ? teamMembers : selectedTeamMembers
  const finalMembers = membersToDisplay.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            finalMembers.map((member) => (
              <TeamMember
                key={member.id}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
