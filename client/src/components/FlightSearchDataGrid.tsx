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
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img"
            src={params.row.airlineLogo || `https://via.placeholder.com/32?text=${params.value.charAt(0)}`}
            alt={params.value}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.flightNumber}
            </Typography>
          </Box>
        </Box>
      )
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
            {formatDuration(params.row.durationMinutes)}
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
        const arrivalTime = calculateArrivalTime(params.row.departureTime, params.row.durationMinutes);
        return (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {arrivalTime}
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
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#008cff', display: 'flex', alignItems: 'center' }}>
            <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
            {params.value}
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
      )
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
  const rows = flights.map((flight) => ({
    id: flight.id,
    airline: flight.airline,
    airlineLogo: flight.airlineLogo,
    flightNumber: flight.flightNumber,
    departureTime: flight.departureTime,
    durationMinutes: flight.durationMinutes,
    stops: flight.stops,
    price: flight.price,
    cabinClass: flight.cabinClass
  }));

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
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
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
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
};

export default FlightSearchDataGrid;