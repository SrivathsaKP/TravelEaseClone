import { useState, useEffect } from 'react';
import { Box, Paper, Tabs, Tab, Container } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import SecurityIcon from '@mui/icons-material/Security';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useLocation, Link } from 'wouter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveTab } from '@/store/tabSlice';

export type TabType = 
  | 'flights' 
  | 'hotels' 
  | 'homestays' 
  | 'buses' 
  | 'trains' 
  | 'cabs' 
  | 'insurance' 
  | 'holiday-packages';

const tabs: { type: TabType; label: string; icon: JSX.Element; path: string }[] = [
  { type: 'flights', label: 'Flights', icon: <FlightIcon />, path: '/flights' },
  { type: 'hotels', label: 'Hotels', icon: <HotelIcon />, path: '/hotels' },
  { type: 'homestays', label: 'Homestays', icon: <HomeWorkIcon />, path: '/homestays' },
  { type: 'holiday-packages', label: 'Holiday Packages', icon: <CardGiftcardIcon />, path: '/holiday-packages' },
  { type: 'trains', label: 'Trains', icon: <TrainIcon />, path: '/trains' },
  { type: 'buses', label: 'Buses', icon: <DirectionsBusIcon />, path: '/buses' },
  { type: 'cabs', label: 'Cabs', icon: <LocalTaxiIcon />, path: '/cabs' },
  { type: 'insurance', label: 'Travel Insurance', icon: <SecurityIcon />, path: '/insurance' },
];

export default function TabNavigation() {
  const [, setLocation] = useLocation();
  const activeTab = useAppSelector(state => state.tab.activeTab);
  const dispatch = useAppDispatch();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabType) => {
    dispatch(setActiveTab(newValue));
    setLocation(tabs.find(tab => tab.type === newValue)?.path || '/');
  };

  // Update tab based on URL when navigation happens outside of tab clicks
  const [location] = useLocation();
  
  useEffect(() => {
    const path = location.split('?')[0]; // Remove query params
    const matchingTab = tabs.find(tab => tab.path === path || (path.startsWith(tab.path + '/')));
    
    if (matchingTab && matchingTab.type !== activeTab) {
      dispatch(setActiveTab(matchingTab.type));
    }
  }, [location, activeTab, dispatch]);

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        boxShadow: 3,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#fff'
            }
          }}
          sx={{
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              minHeight: '72px',
              py: 2,
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#fff',
              },
              '& .MuiSvgIcon-root': {
                mb: 0.5,
              }
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-evenly',
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.type}
              label={tab.label}
              value={tab.type}
              icon={tab.icon}
              iconPosition="top"
            />
          ))}
        </Tabs>
      </Container>
    </Box>
  );
}