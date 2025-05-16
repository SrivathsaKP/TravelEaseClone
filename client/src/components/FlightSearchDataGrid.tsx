import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Paper, 
  Divider,
  IconButton
} from '@mui/material';
import { Flight } from '@/lib/types';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface FlightSearchDataGridProps {
  flights: Flight[];
  sourceCity: string;
  destinationCity: string;
}

const FlightSearchDataGrid: React.FC<FlightSearchDataGridProps> = ({ 
  flights, 
  sourceCity, 
  destinationCity 
}) => {
  const [, setLocation] = useLocation();
  const [pageSize, setPageSize] = useState(10);

  // Format time for display (e.g., "07:30")
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  // Format duration (e.g., "2h 15m")
  const formatDuration = (duration: string | number | undefined) => {
    if (!duration) return "N/A";
    
    // If duration is already a formatted string
    if (typeof duration === 'string') {
      // If it's already in the right format like "2h 10m", return it
      if (duration.includes('h') && duration.includes('m')) {
        return duration;
      }
      
      // Try to parse it as minutes
      const minutes = parseInt(duration, 10);
      if (!isNaN(minutes)) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
      }
      
      // If we can't parse it, return as is
      return duration;
    }
    
    // If duration is a number, assume it's in minutes
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return `${hours}h ${mins}m`;
    }
    
    // Fallback for unexpected format
    return "N/A";
  };

  // Calculate and format the arrival time
  const calculateArrivalTime = (departureTime: string, durationMinutes: number) => {
    const departure = new Date(departureTime);
    const arrival = new Date(departure.getTime() + durationMinutes * 60000);
    return formatTime(arrival.toISOString());
  };

  // Format date for display (e.g., "15 May")
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Column definitions for DataGrid
  const columns: GridColDef[] = [
    { 
      field: 'airline', 
      headerName: 'Airline', 
      width: 170,
      renderCell: (params: GridRenderCellParams) => {
        // Ensure airline name is a string, not an object
        const airlineName = typeof params.value === 'string' ? params.value : 
                           typeof params.value === 'object' && params.value?.name ? params.value.name : 'Unknown';
        
        // Get logo from either row or directly from the airline object
        const logoUrl = params.row.airlineLogo || 
                        (typeof params.value === 'object' && params.value?.logo ? params.value.logo : '');
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img"
              src={logoUrl || `https://via.placeholder.com/32?text=${airlineName.charAt(0)}`}
              alt={airlineName}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {airlineName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {params.row.flightNumber || ''}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    { 
      field: 'departure', 
      headerName: 'Departure', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {formatTime(params.row.departureTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(params.row.departureTime)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            {formatDuration(params.row.duration)}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            mt: 0.5
          }}>
            <Box sx={{ 
              height: '2px', 
              width: '80%', 
              bgcolor: '#e0e0e0',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: '#008cff'
              },
              '&::before': {
                left: 0
              },
              '&::after': {
                right: 0
              }
            }}/>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {params.row.stops === 0 ? 'Non-stop' : `${params.row.stops} stop${params.row.stops > 1 ? 's' : ''}`}
          </Typography>
        </Box>
      )
    },
    { 
      field: 'arrival', 
      headerName: 'Arrival', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        // Use arrival time directly if available, otherwise calculate it
        const displayTime = params.row.arrivalTime 
          ? formatTime(params.row.arrivalTime)
          : params.row.duration 
            ? calculateArrivalTime(params.row.departureTime, params.row.duration)
            : "N/A";
            
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {displayTime}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(params.row.departureTime)}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        // Handle different price formats
        let displayPrice = 0;
        
        if (typeof params.value === 'number') {
          displayPrice = params.value;
        } else if (typeof params.value === 'object') {
          // Try to extract the price from different object structures
          if (params.value?.totalFare) {
            displayPrice = params.value.totalFare;
          } else if (params.value?.amount) {
            displayPrice = params.value.amount;
          } else if (params.value?.basePrice) {
            displayPrice = params.value.basePrice;
          }
        }
        
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#008cff', display: 'flex', alignItems: 'center' }}>
              <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
              {displayPrice}
            </Typography>
            {Math.random() > 0.5 && (
              <Chip
                label="Deal"
                size="small"
                icon={<LocalOfferIcon sx={{ fontSize: '0.8rem' }} />}
                sx={{ 
                  bgcolor: '#ffeee0', 
                  color: '#ff8a00',
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-icon': { color: '#ff8a00' }
                }}
              />
            )}
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ color: '#008cff' }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#008cff' }}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
          <Button 
            variant="contained"
            size="small"
            sx={{ 
              bgcolor: '#008cff',
              '&:hover': { bgcolor: '#0071ce' },
              fontSize: '0.75rem',
              py: 0.5
            }}
            onClick={() => {
              // Create booking data object
              const bookingData = {
                type: 'flight',
                amount: params.row.price,
                details: {
                  flight: params.row.flightNumber,
                  airline: params.row.airline,
                  departureTime: formatTime(params.row.departureTime),
                  departureDate: formatDate(params.row.departureTime),
                  arrivalTime: calculateArrivalTime(params.row.departureTime, params.row.durationMinutes),
                  duration: formatDuration(params.row.durationMinutes),
                  from: sourceCity,
                  to: destinationCity,
                  passengers: 1,
                  class: params.row.cabinClass || 'Economy'
                }
              };
              
              // Store booking data in sessionStorage
              sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
              
              // Navigate to checkout page
              setLocation('/checkout');
            }}
          >
            BOOK
          </Button>
        </Box>
      )
    }
  ];

  // Prepare rows for DataGrid
  const rows = flights.map((flight) => {
    // Handle different flight data formats
    let airlineName = typeof flight.airline === 'string' ? flight.airline : flight.airline?.name || '';
    let airlineLogo = typeof flight.airline === 'object' ? flight.airline?.logo || '' : '';
    
    // Extract the price value depending on the structure
    let priceValue = 0;
    if (typeof flight.price === 'number') {
      priceValue = flight.price;
    } else if (typeof flight.price === 'object') {
      // Try different price formats
      if (flight.price?.totalFare) {
        priceValue = flight.price.totalFare;
      } else if (flight.price?.amount) {
        priceValue = flight.price.amount;
      } else if (flight.price?.basePrice) {
        priceValue = flight.price.basePrice;
      } else {
        // Fallback to a sample value
        priceValue = 4500;
      }
    }
    
    // Extract departure and arrival times from nested objects if needed
    let departureTime = flight.departureTime || '';
    let arrivalTime = flight.arrivalTime || '';
    
    // Check for nested time information in source/destination objects
    if (!departureTime && flight.source?.departureTime) {
      departureTime = flight.source.departureTime;
    }
    
    if (!arrivalTime && flight.destination?.arrivalTime) {
      arrivalTime = flight.destination.arrivalTime;
    }
    
    // For duration, handle both string and number formats
    let duration = flight.duration;
    if (typeof duration === 'number') {
      // Convert minutes to formatted duration string
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      duration = `${hours}h ${mins}m`;
    }
    
    return {
      id: flight.id,
      airline: airlineName,
      airlineLogo: airlineLogo,
      flightNumber: flight.flightNumber || '',
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      duration: duration,
      durationMinutes: typeof flight.duration === 'number' ? flight.duration : 0,
      stops: flight.stopCount || flight.stops || 0,
      price: priceValue,
      cabinClass: flight.cabinClass || 'Economy'
    };
  });

  return (
    <Paper sx={{ height: 'calc(100vh - 250px)', width: '100%', p: 2, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h6" fontWeight="bold">
          {sourceCity} to {destinationCity} Flights
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            startIcon={<FilterListIcon />}
            size="small"
            sx={{ 
              mr: 1,
              color: '#008cff',
              border: '1px solid',
              borderColor: '#008cff'
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ 
              color: '#008cff',
              borderColor: '#008cff'
            }}
          >
            Price Alert
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Chip 
          label="Cheapest" 
          variant="outlined"
          sx={{ 
            bgcolor: '#e1f5fe', 
            borderColor: '#008cff',
            color: '#008cff',
            fontWeight: 'bold'
          }}
        />
        <Chip 
          label="Fastest" 
          variant="outlined"
          sx={{ 
            borderColor: '#757575',
            color: '#757575'
          }}
        />
        <Chip 
          label="Early departure" 
          variant="outlined"
          sx={{ 
            borderColor: '#757575',
            color: '#757575'
          }}
        />
        <Chip 
          label="Late departure" 
          variant="outlined"
          sx={{ 
            borderColor: '#757575',
            color: '#757575'
          }}
        />
        <Chip 
          label="Early arrival" 
          variant="outlined"
          sx={{ 
            borderColor: '#757575',
            color: '#757575'
          }}
        />
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        onPaginationModelChange={(model) => setPageSize(model.pageSize)}
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
  );
};

export default FlightSearchDataGrid;