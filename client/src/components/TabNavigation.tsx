import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Container, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation, useRoute } from 'wouter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentTab, type TabType } from '@/store/tabSlice';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  color: '#3a3a3a',
  padding: '12px 24px',
  fontSize: '14px',
  textTransform: 'none',
  minWidth: 'auto',
  '&.Mui-selected': {
    color: '#ffffff',
    backgroundColor: '#008cff',
    borderRadius: '4px 4px 0 0',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  backgroundColor: '#f2f2f2',
  borderRadius: '4px 4px 0 0',
}));

interface TabNavigationProps {
  onTabChange?: (tabValue: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ onTabChange }) => {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector((state) => state.tab.currentTab);
  const [, navigate] = useLocation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    dispatch(setCurrentTab(newValue));
    
    // Navigate to the appropriate page based on the tab
    switch (newValue) {
      case 'flights':
        navigate('/flights');
        break;
      case 'hotels':
        navigate('/hotels');
        break;
      case 'homestays':
        navigate('/homestays');
        break;
      case 'holidayPackages':
        navigate('/holiday-packages');
        break;
      case 'trains':
        navigate('/trains');
        break;
      case 'buses':
        navigate('/buses');
        break;
      case 'cabs':
        navigate('/cabs');
        break;
      case 'forexCards':
        navigate('/forex-cards');
        break;
      case 'travelInsurance':
        navigate('/travel-insurance');
        break;
    }
    
    // Callback if provided
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <Paper elevation={0} square sx={{ borderRadius: '8px 8px 0 0' }}>
      <StyledTabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="travel services tabs"
      >
        <StyledTab label="Flights" value="flights" />
        <StyledTab label="Hotels" value="hotels" />
        <StyledTab label="Homestays" value="homestays" />
        <StyledTab label="Holiday Packages" value="holidayPackages" />
        <StyledTab label="Trains" value="trains" />
        <StyledTab label="Buses" value="buses" />
        <StyledTab label="Cabs" value="cabs" />
        <StyledTab label="Forex Cards" value="forexCards" />
        <StyledTab label="Travel Insurance" value="travelInsurance" />
      </StyledTabs>
    </Paper>
  );
};

export default TabNavigation;