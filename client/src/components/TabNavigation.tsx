import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { TabType, setCurrentTab } from '@/store/tabSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  Tabs, 
  Tab, 
  Box 
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Tab configuration
const tabs: { type: TabType; label: string; icon: JSX.Element; path: string }[] = [
  { 
    type: 'flights', 
    label: 'Flights', 
    icon: <FlightIcon />, 
    path: '/flights' 
  },
  { 
    type: 'hotels', 
    label: 'Hotels', 
    icon: <HotelIcon />, 
    path: '/hotels' 
  },
  { 
    type: 'homestays', 
    label: 'Homestays', 
    icon: <HomeIcon />, 
    path: '/homestays' 
  },
  { 
    type: 'holidayPackages', 
    label: 'Holiday Packages', 
    icon: <CardTravelIcon />, 
    path: '/holiday-packages' 
  },
  { 
    type: 'trains', 
    label: 'Trains', 
    icon: <TrainIcon />, 
    path: '/trains' 
  },
  { 
    type: 'buses', 
    label: 'Buses', 
    icon: <DirectionsBusIcon />, 
    path: '/buses' 
  },
  { 
    type: 'cabs', 
    label: 'Cabs & Taxi', 
    icon: <LocalTaxiIcon />, 
    path: '/cabs' 
  },
  { 
    type: 'forexCards', 
    label: 'Forex Cards', 
    icon: <AccountBalanceWalletIcon />, 
    path: '/forex-cards' 
  },
  { 
    type: 'travelInsurance', 
    label: 'Travel Insurance', 
    icon: <VerifiedUserIcon />, 
    path: '/travel-insurance' 
  }
];

// Map paths to tab types
const pathToTabType: Record<string, TabType> = {
  '/flights': 'flights',
  '/hotels': 'hotels',
  '/homestays': 'homestays',
  '/holiday-packages': 'holidayPackages',
  '/trains': 'trains',
  '/buses': 'buses',
  '/cabs': 'cabs',
  '/forex-cards': 'forexCards',
  '/travel-insurance': 'travelInsurance'
};

export default function TabNavigation() {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector((state) => state.tab.currentTab);
  const [location, setLocation] = useLocation();
  const [value, setValue] = useState(0);

  // Update tab based on current location
  useEffect(() => {
    // Extract the base path without query parameters
    const path = location.split('?')[0];
    
    // Find the tab index based on the current path
    const tabIndex = tabs.findIndex((tab) => tab.path === path);
    
    if (tabIndex !== -1) {
      setValue(tabIndex);
      
      // Update Redux state if necessary
      const tabType = pathToTabType[path];
      if (tabType && tabType !== currentTab) {
        dispatch(setCurrentTab(tabType));
      }
    }
  }, [location, currentTab, dispatch]);

  // Handle tab change
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selectedTab = tabs[newValue];
    
    // Update Redux state
    dispatch(setCurrentTab(selectedTab.type));
    
    // Navigate to the new route
    setLocation(selectedTab.path);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: '#ffcc01',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Travel options tabs"
        sx={{
          '& .MuiTabs-indicator': { 
            backgroundColor: '#008cff',
            height: 3
          },
          '& .MuiTab-root': { 
            color: '#333',
            fontWeight: 500,
            fontSize: '0.9rem',
            textTransform: 'none',
            minHeight: 56,
            '&.Mui-selected': {
              color: '#008cff',
              fontWeight: 700
            }
          }
        }}
      >
        {tabs.map((tab) => (
          <Tab 
            key={tab.type} 
            icon={tab.icon} 
            label={tab.label} 
            iconPosition="top"
            sx={{ minWidth: { xs: 80, sm: 100, md: 120 } }}
          />
        ))}
      </Tabs>
    </Box>
  );
}