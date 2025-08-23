import React from 'react';
import { 
  Skeleton, 
  Box, 
  Card, 
  CardContent, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Divider,
  Typography
} from '@mui/material';


// Basic skeleton components
export const TextSkeleton = ({ width = '100%', height = 20, variant = 'text' }: {
  width?: string | number;
  height?: number;
  variant?: 'text' | 'circular' | 'rectangular';
}) => (
  <Skeleton variant={variant} width={width} height={height} />
);

export const AvatarSkeleton = ({ size = 40 }: { size?: number }) => (
  <Skeleton variant="circular" width={size} height={size} />
);

export const ImageSkeleton = ({ width = '100%', height = 200 }: {
  width?: string | number;
  height?: number;
}) => (
  <Skeleton variant="rectangular" width={width} height={height} />
);

// Card skeleton components
export const CardSkeleton = ({ 
  showImage = true, 
  showActions = true, 
  lines = 3,
  imageHeight = 200 
}: {
  showImage?: boolean;
  showActions?: boolean;
  lines?: number;
  imageHeight?: number;
}) => (
  <Card sx={{ maxWidth: 345, m: 1 }}>
    {showImage && (
      <Skeleton variant="rectangular" width="100%" height={imageHeight} />
    )}
    <CardContent>
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton 
          key={index} 
          variant="text" 
          width={index === lines - 1 ? '80%' : '100%'} 
          height={16} 
          sx={{ mb: 0.5 }} 
        />
      ))}
      {showActions && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </Box>
      )}
    </CardContent>
  </Card>
);

export const HotelCardSkeleton = () => (
  <Card sx={{ maxWidth: 345, m: 1 }}>
    <Skeleton variant="rectangular" width="100%" height={200} />
    <CardContent>
      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
        <Skeleton variant="text" width="30%" height={16} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="text" width="40%" height={20} sx={{ mr: 1 }} />
        <Skeleton variant="text" width="20%" height={16} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="30%" height={24} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>
    </CardContent>
  </Card>
);

export const FlightCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={60} height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width={60} height={24} />
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={40} height={16} />
      </Box>
      
      <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
        <Skeleton variant="text" width={30} height={16} sx={{ textAlign: 'center', mb: 0.5 }} />
        <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="circular" width={5} height={5} />
            <Skeleton variant="circular" width={5} height={5} />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={40} height={16} />
      </Box>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={60} height={24} />
        <Skeleton variant="rectangular" width={60} height={24} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Paper>
);

// Data Grid skeleton components
export const DataGridSkeleton = ({ rows = 5, columns = 4 }: {
  rows?: number;
  columns?: number;
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" width="80%" height={20} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="text" width="90%" height={16} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const FlightDataGridSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '170px' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={60} height={16} />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', width: '75px' }}>
              <Skeleton variant="text" width={50} height={20} />
              <Skeleton variant="text" width={40} height={16} />
            </Box>
            
            <Box sx={{ mx: 2, flex: 1, maxWidth: '200px', position: 'relative' }}>
              <Skeleton variant="text" width={30} height={16} sx={{ textAlign: 'center', mb: 0.5 }} />
              <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="circular" width={5} height={5} />
                  <Skeleton variant="circular" width={5} height={5} />
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'center', width: '75px' }}>
              <Skeleton variant="text" width={50} height={20} />
              <Skeleton variant="text" width={40} height={16} />
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'right', width: '120px' }}>
            <Skeleton variant="text" width={60} height={24} />
            <Skeleton variant="rectangular" width={100} height={36} sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Paper>
    ))}
  </Box>
);

// Train skeleton components
export const TrainCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width={60} height={24} />
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={50} height={16} />
      </Box>
      
      <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
        <Skeleton variant="text" width={40} height={16} sx={{ textAlign: 'center', mb: 0.5 }} />
        <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="circular" width={5} height={5} />
            <Skeleton variant="circular" width={5} height={5} />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={50} height={16} />
      </Box>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={70} height={24} />
        <Skeleton variant="rectangular" width={70} height={24} />
        <Skeleton variant="rectangular" width={70} height={24} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Paper>
);

export const TrainDataGridSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <TrainCardSkeleton key={index} />
    ))}
  </Box>
);

// Bus skeleton components
export const BusCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={90} height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width={60} height={24} />
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={40} height={16} />
      </Box>
      
      <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
        <Skeleton variant="text" width={35} height={16} sx={{ textAlign: 'center', mb: 0.5 }} />
        <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="circular" width={5} height={5} />
            <Skeleton variant="circular" width={5} height={5} />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={40} height={16} />
      </Box>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={60} height={24} />
        <Skeleton variant="rectangular" width={60} height={24} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Paper>
);

export const BusDataGridSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <BusCardSkeleton key={index} />
    ))}
  </Box>
);

// Cab skeleton components
export const CabCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width={60} height={24} />
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={50} height={16} />
      </Box>
      
      <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
        <Skeleton variant="text" width={40} height={16} sx={{ textAlign: 'center', mb: 0.5 }} />
        <Box sx={{ height: '1px', bgcolor: '#CCCCCC', width: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="circular" width={5} height={5} />
            <Skeleton variant="circular" width={5} height={5} />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={50} height={16} />
      </Box>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Paper>
);

export const CabDataGridSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <CabCardSkeleton key={index} />
    ))}
  </Box>
);

// Insurance skeleton components
export const InsuranceCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width={60} height={24} />
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
      <Skeleton variant="text" width={80} height={20} />
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={100} height={24} />
        <Skeleton variant="rectangular" width={100} height={24} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Paper>
);

export const InsuranceDataGridSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <InsuranceCardSkeleton key={index} />
    ))}
  </Box>
);

// List skeleton components
export const ListSkeleton = ({ items = 5, showAvatar = true }: {
  items?: number;
  showAvatar?: boolean;
}) => (
  <Box>
    {Array.from({ length: items }).map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
        {showAvatar && (
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        )}
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="40%" height={16} />
        </Box>
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    ))}
  </Box>
);

// Form skeleton components
export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
  <Box sx={{ maxWidth: 400 }}>
    {Array.from({ length: fields }).map((_, index) => (
      <Box key={index} sx={{ mb: 3 }}>
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </Box>
    ))}
    <Skeleton variant="rectangular" width="100%" height={48} />
  </Box>
);

// Search results skeleton
export const SearchResultsSkeleton = ({ 
  type = 'flight', 
  count = 3 
}: {
  type?: 'flight' | 'hotel' | 'train' | 'bus' | 'cab' | 'insurance';
  count?: number;
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'flight':
        return <FlightDataGridSkeleton rows={count} />;
      case 'hotel':
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {Array.from({ length: count }).map((_, index) => (
              <Box key={index}>
                <HotelCardSkeleton />
              </Box>
            ))}
          </Box>
        );
      case 'train':
        return <TrainDataGridSkeleton rows={count} />;
      case 'bus':
        return <BusDataGridSkeleton rows={count} />;
      case 'cab':
        return <CabDataGridSkeleton rows={count} />;
      case 'insurance':
        return <InsuranceDataGridSkeleton rows={count} />;
      default:
        return <ListSkeleton items={count} />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
      {renderSkeleton()}
    </Box>
  );
};

// Page skeleton components
export const PageSkeleton = () => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
    <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
      <Box>
        <SearchResultsSkeleton type="flight" count={3} />
      </Box>
      <Box>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Box>
);

// Loading overlay skeleton
export const LoadingOverlaySkeleton = ({ message = 'Loading...' }: { message?: string }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
  >
    <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
    <Skeleton variant="text" width={100} height={20} />
  </Box>
);

// Export all skeleton components
export {
  Skeleton as MuiSkeleton,
};
