"use client";

import React from 'react';
import { useTeamTheme } from '../context/ThemeContext';
import { teams } from '../lib/teams';

export const TeamSelector: React.FC = () => {
  const { activeTeam, setActiveTeamId } = useTeamTheme();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 rounded-full p-2 bg-background/50 backdrop-blur-md border border-white/10 shadow-2xl">
        {Object.values(teams).map((team) => {
          const isActive = activeTeam.id === team.id;
          return (
            <button
              key={team.id}
              onClick={() => setActiveTeamId(team.id)}
              className={`
                relative flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}
              `}
            >
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full bg-team-primary opacity-20"
                />
              )}
              <span 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: team.colors.primary }}
              />
              {team.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
