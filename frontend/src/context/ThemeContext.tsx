"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { teams, TeamConfig, defaultTeamId } from '../lib/teams';

interface ThemeContextProps {
  activeTeam: TeamConfig;
  setActiveTeamId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamId, setTeamId] = useState<string>(defaultTeamId);

  useEffect(() => {
    // Load from local storage on mount
    const storedTeamId = localStorage.getItem('f1-selected-team');
    if (storedTeamId && teams[storedTeamId]) {
      setTeamId(storedTeamId);
    }
  }, []);

  const setActiveTeamId = (id: string) => {
    if (teams[id]) {
      setTeamId(id);
      localStorage.setItem('f1-selected-team', id);
    }
  };

  const activeTeam = teams[teamId] || teams[defaultTeamId];

  return (
    <ThemeContext.Provider value={{ activeTeam, setActiveTeamId }}>
      {/* 
        We inject dynamic CSS variables onto a wrapper so Tailwind 
        classes (like bg-team-primary) map to runtime hex values.
      */}
      <div 
        style={{
          '--team-primary': activeTeam.colors.primary,
          '--team-secondary': activeTeam.colors.secondary,
          transition: 'all 0.5s ease-in-out'
        } as React.CSSProperties}
        className="contents"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTeamTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTeamTheme must be used within a ThemeProvider');
  }
  return context;
};
