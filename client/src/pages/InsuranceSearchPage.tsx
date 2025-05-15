import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { InsurancePlan } from '@/lib/types';
import { selectInsuranceSearch, setInsuranceSearch } from '@/store/searchSlice';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import ShieldIcon from '@mui/icons-material/Shield';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LuggageIcon from '@mui/icons-material/Luggage';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import dayjs from 'dayjs';

// Travel types
const travelTypes = ['Domestic', 'International'];

// Traveler age options
const ageGroups = [
  { label: 'Adults (>18 years)', value: 'adults' },
  { label: 'Children (2-18 years)', value: 'children' },
  { label: 'Infants (<2 years)', value: 'infants' }
];

// Trip duration options
const durationOptions = [
  { label: '1-5 days', value: 5 },
  { label: '6-10 days', value: 10 },
  { label: '11-15 days', value: 15 },
  { label: '16-30 days', value: 30 },
  { label: '31-45 days', value: 45 },
  { label: '46-60 days', value: 60 },
];

// Insurance providers
const insuranceProviders = [
  'Bajaj Allianz',
  'ICICI Lombard',
  'TATA AIG',
  'HDFC ERGO',
  'Reliance General'
];

const InsuranceSearchPage = () => {
  const dispatch = useDispatch();
  const insuranceSearchParams = useSelector(selectInsuranceSearch);
  
  // State for insurance search results
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [travelType, setTravelType] = useState<'domestic' | 'international'>(insuranceSearchParams.travelType || 'domestic');
  const [travelers, setTravelers] = useState(insuranceSearchParams.travelers || 1);
  const [startDate, setStartDate] = useState(insuranceSearchParams.startDate || dayjs().format('YYYY-MM-DD'));
  const [duration, setDuration] = useState(insuranceSearchParams.duration || 7);
  
  // Handle form submission
  const handleSearch = () => {
    setLoading(true);
    
    // Update Redux store with current search parameters
    dispatch(setInsuranceSearch({
      travelType,
      travelers,
      startDate,
      duration
    }));
    
    // Fetch insurance plans
    fetchInsurancePlans();
  };
  
  // Fetch insurance plans from API
  const fetchInsurancePlans = async () => {
    try {
      const response = await fetch(`/api/insurance-plans/search?coverageType=${travelType}&duration=${duration}`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setInsurancePlans(data);
      } else {
        setInsurancePlans([]);
      }
    } catch (error) {
      console.error("Error fetching insurance plans:", error);
      setInsurancePlans([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Format cover amount
  const formatCoverAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };
  
  // Load insurance plans on mount with default values
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Column definitions for the DataGrid
  const columns: GridColDef[] = [
    {
      field: 'provider',
      headerName: 'Insurance Provider',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.planName}
          </Typography>
        </Box>
      )
    },
    {
      field: 'coverageAmount',
      headerName: 'Coverage',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {formatCoverAmount(params.value)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Max Coverage
          </Typography>
        </Box>
      )
    },
    {
      field: 'coverageType',
      headerName: 'Travel Type',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Chip
            label={params.value}
            size="small"
            sx={{ 
              textTransform: 'capitalize',
              bgcolor: params.value === 'international' ? 'rgba(0, 140, 255, 0.08)' : 'rgba(76, 175, 80, 0.08)',
              color: params.value === 'international' ? '#008cff' : 'success.main'
            }}
          />
        </Box>
      )
    },
    {
      field: 'benefits',
      headerName: 'Key Benefits',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {params.value.slice(0, 3).map((benefit: string, index: number) => (
            <Chip 
              key={index}
              label={benefit}
              size="small"
              sx={{ 
                height: '20px',
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 140, 255, 0.08)',
                color: '#008cff'
              }}
            />
          ))}
          {params.value.length > 3 && (
            <Chip 
              label={`+${params.value.length - 3} more`}
              size="small"
              sx={{ 
                height: '20px',
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                color: 'text.secondary'
              }}
            />
          )}
        </Box>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#008cff' }}>
            ₹{params.value}
          </Typography>
          {Math.random() > 0.6 && (
            <Chip
              label="Deal"
              size="small"
              icon={<LocalOfferIcon sx={{ fontSize: '0.8rem' }} />}
              sx={{ 
                height: '20px',
                fontSize: '0.7rem',
                bgcolor: 'rgba(0, 140, 255, 0.08)',
                color: '#008cff',
                '.MuiChip-icon': { color: '#008cff' }
              }}
            />
          )}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      renderCell: () => (
        <Button
          variant="contained"
          size="small"
          sx={{ 
            bgcolor: '#008cff', 
            '&:hover': { bgcolor: '#0071ce' },
            fontSize: '0.75rem',
            whiteSpace: 'nowrap'
          }}
        >
          Buy Now
        </Button>
      )
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Search form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Travel Insurance
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
          {/* Travel Type */}
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Travel Type</InputLabel>
              <Select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value as 'domestic' | 'international')}
                label="Travel Type"
                startAdornment={<FlightIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                <MenuItem value="domestic">Domestic</MenuItem>
                <MenuItem value="international">International</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {/* Travelers */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Travelers</InputLabel>
              <Select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                label="Travelers"
                startAdornment={<PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Start Date */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <TextField
                type="date"
                label="Trip Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                InputProps={{
                  startAdornment: <CalendarMonthIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </FormControl>
          </Box>
          
          {/* Duration */}
          <Box sx={{ flex: '1 1 170px', minWidth: '170px' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Duration</InputLabel>
              <Select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                label="Duration"
                startAdornment={<ShieldIcon sx={{ color: 'text.secondary', mr: 1 }} />}
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          {/* Search Button */}
          <Box sx={{ flex: '0 0 130px' }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ 
                bgcolor: '#008cff', 
                '&:hover': { bgcolor: '#0071ce' },
                py: 1,
                fontSize: '0.9rem'
              }}
              onClick={handleSearch}
              disabled={loading}
              startIcon={!loading && <SearchIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH PLANS'}
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Results */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Filters */}
        <Box sx={{ width: 280 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              FILTERS
            </Typography>
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Insurance Provider</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {insuranceProviders.map((provider) => (
                  <Box 
                    key={provider}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '3px', 
                        border: '1px solid #ccc',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {provider}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            
            <Divider />
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Coverage Amount</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['Up to ₹5 Lac', '₹5 Lac - ₹10 Lac', '₹10 Lac - ₹50 Lac', 'Above ₹50 Lac', 'Above ₹1 Cr'].map((amount) => (
                  <Box 
                    key={amount}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '3px', 
                        border: '1px solid #ccc',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {amount}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            
            <Divider />
            
            <Accordion defaultExpanded elevation={0} sx={{ '&::before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0 }}
              >
                <Typography variant="subtitle2">Benefits</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                {['Medical Expenses', 'Trip Cancellation', 'Lost Baggage', 'Flight Delay', 'Adventure Sports'].map((benefit) => (
                  <Box 
                    key={benefit}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.5,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0, 140, 255, 0.04)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '3px', 
                        border: '1px solid #ccc',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
        
        {/* Results */}
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : insurancePlans.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>No insurance plans found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your search parameters or select a different travel type or duration.
              </Typography>
            </Paper>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {travelType === 'domestic' ? 'Domestic' : 'International'} Travel Insurance Plans
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'} • Trip starts {dayjs(startDate).format('MMM D, YYYY')} • {duration} {duration === 1 ? 'day' : 'days'} duration
              </Typography>
              
              <Paper elevation={2} sx={{ overflow: 'hidden', mt: 2 }}>
                <DataGrid
                  rows={insurancePlans}
                  columns={columns}
                  autoHeight
                  hideFooter={insurancePlans.length <= 10}
                  checkboxSelection={false}
                  pagination={true}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } }
                  }}
                  disableRowSelectionOnClick
                  getRowHeight={() => 'auto'}
                  sx={{
                    '& .MuiDataGrid-cell': {
                      py: 1,
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row:hover': {
                      bgcolor: 'rgba(0, 140, 255, 0.04)',
                    }
                  }}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                />
              </Paper>
              
              {/* Insurance types */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Why Buy Travel Insurance?
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {[
                    {
                      title: 'Medical Coverage',
                      icon: <LocalHospitalIcon sx={{ color: '#008cff', fontSize: '2rem' }} />,
                      description: 'Covers medical expenses including hospitalization abroad',
                      features: ['Emergency Medical Expenses', 'Hospitalization', 'Medical Evacuation']
                    },
                    {
                      title: 'Trip Protection',
                      icon: <FlightTakeoffIcon sx={{ color: '#008cff', fontSize: '2rem' }} />,
                      description: 'Coverage for trip cancellations, delays and interruptions',
                      features: ['Trip Cancellation', 'Trip Delay', 'Missed Connection']
                    },
                    {
                      title: 'Baggage Coverage',
                      icon: <LuggageIcon sx={{ color: '#008cff', fontSize: '2rem' }} />,
                      description: 'Protection against lost, stolen or damaged baggage',
                      features: ['Lost Baggage', 'Baggage Delay', 'Personal Items']
                    },
                    {
                      title: 'Assistance Services',
                      icon: <HealthAndSafetyIcon sx={{ color: '#008cff', fontSize: '2rem' }} />,
                      description: '24/7 emergency assistance services while traveling',
                      features: ['Emergency Assistance', 'Legal Assistance', 'Translation Services']
                    }
                  ].map((benefit, index) => (
                    <Card 
                      key={benefit.title}
                      sx={{ 
                        flex: '1 1 280px',
                        minWidth: '280px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { 
                          transform: 'translateY(-4px)',
                          boxShadow: 3 
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {benefit.icon}
                          <Typography variant="subtitle1" fontWeight="bold" ml={1}>
                            {benefit.title}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" mb={1.5}>
                          {benefit.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <List dense disablePadding>
                          {benefit.features.map((feature, i) => (
                            <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <CheckCircleIcon color="success" sx={{ fontSize: '1rem' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={feature} 
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default InsuranceSearchPage;