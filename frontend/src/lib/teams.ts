export interface TeamConfig {
  id: string;
  name: string;
  shortName: string;
  colors: {
    primary: string;
    secondary: string;
  };
  assets: {
    carImage: string;
    logo: string;
  };
}

export const teams: Record<string, TeamConfig> = {
  ferrari: {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    shortName: 'Ferrari',
    colors: {
      primary: '#E10600',
      secondary: '#000000',
    },
    assets: {
      carImage: '/assets/cars/ferrari.png',
      logo: '/assets/logos/ferrari.png',
    }
  },
  mercedes: {
    id: 'mercedes',
    name: 'Mercedes-AMG Petronas F1 Team',
    shortName: 'Mercedes',
    colors: {
      primary: '#00A19B',
      secondary: '#CCCCCC',
    },
    assets: {
      carImage: '/assets/cars/mercedes.png',
      logo: '/assets/logos/mercedes.png',
    }
  },
  redbull: {
    id: 'redbull',
    name: 'Oracle Red Bull Racing',
    shortName: 'Red Bull',
    colors: {
      primary: '#1E41FF',
      secondary: '#CC1E4A',
    },
    assets: {
      carImage: '/assets/cars/redbull.png',
      logo: '/assets/logos/redbull.png',
    }
  },
  mclaren: {
    id: 'mclaren',
    name: 'McLaren F1 Team',
    shortName: 'McLaren',
    colors: {
      primary: '#FF8700',
      secondary: '#000000',
    },
    assets: {
      carImage: '/assets/cars/mclaren.png',
      logo: '/assets/logos/mclaren.png',
    }
  }
};

export const defaultTeamId = 'ferrari';
