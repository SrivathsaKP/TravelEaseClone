# MUI Skeleton Components

A comprehensive collection of MUI skeleton components for loading states in the TravelEase application.

## Overview

This skeleton library provides pre-built loading placeholders that match the actual content structure, providing a better user experience than simple spinners. The components are designed to work with the existing MUI theme and styling.

## Available Components

### Basic Components

- **TextSkeleton** - For text content with customizable width and height
- **AvatarSkeleton** - For user avatars and profile pictures  
- **ImageSkeleton** - For images and media content
- **MuiSkeleton** - Raw MUI Skeleton component

### Card Components

- **CardSkeleton** - Generic card layout with configurable options
- **HotelCardSkeleton** - Hotel-specific card layout
- **FlightCardSkeleton** - Flight-specific card layout

### Data Grid Components

- **DataGridSkeleton** - Generic table layout
- **FlightDataGridSkeleton** - Flight-specific table layout

### List and Form Components

- **ListSkeleton** - List items with optional avatars
- **FormSkeleton** - Form fields and submit button

### Search Results Components

- **SearchResultsSkeleton** - Complete search results layout for different types (flight, hotel, train, bus)
- **PageSkeleton** - Full page layout with sidebar

### Overlay Components

- **LoadingOverlaySkeleton** - Overlay loading state

## Usage Examples

### Basic Usage

```tsx
import { TextSkeleton, AvatarSkeleton } from '@/components/ui/skeleton';

// Text skeleton
<TextSkeleton width="80%" height={20} />

// Avatar skeleton
<AvatarSkeleton size={40} />
```

### Card Loading

```tsx
import { HotelCardSkeleton } from '@/components/ui/skeleton';

{loading ? (
  <Grid container spacing={2}>
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <HotelCardSkeleton />
      </Grid>
    ))}
  </Grid>
) : (
  // Actual hotel cards
)}
```

### Search Results Loading

```tsx
import { SearchResultsSkeleton } from '@/components/ui/skeleton';

{loading ? (
  <SearchResultsSkeleton type="flight" count={5} />
) : (
  <FlightResults flights={flights} />
)}
```

### Form Loading

```tsx
import { FormSkeleton } from '@/components/ui/skeleton';

{loading ? (
  <FormSkeleton fields={4} />
) : (
  // Actual form
)}
```

## Component Props

### TextSkeleton
```tsx
interface TextSkeletonProps {
  width?: string | number;
  height?: number;
  variant?: 'text' | 'circular' | 'rectangular';
}
```

### AvatarSkeleton
```tsx
interface AvatarSkeletonProps {
  size?: number;
}
```

### CardSkeleton
```tsx
interface CardSkeletonProps {
  showImage?: boolean;
  showActions?: boolean;
  lines?: number;
  imageHeight?: number;
}
```

### SearchResultsSkeleton
```tsx
interface SearchResultsSkeletonProps {
  type?: 'flight' | 'hotel' | 'train' | 'bus';
  count?: number;
}
```

### DataGridSkeleton
```tsx
interface DataGridSkeletonProps {
  rows?: number;
  columns?: number;
}
```

### ListSkeleton
```tsx
interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
}
```

### FormSkeleton
```tsx
interface FormSkeletonProps {
  fields?: number;
}
```

## Migration Guide

### Replacing CircularProgress

**Before:**
```tsx
{loading ? (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
    <CircularProgress />
  </Box>
) : (
  <FlightResults flights={flights} />
)}
```

**After:**
```tsx
{loading ? (
  <SearchResultsSkeleton type="flight" count={5} />
) : (
  <FlightResults flights={flights} />
)}
```

### Replacing Button Loading States

**Before:**
```tsx
<Button disabled={loading}>
  {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
</Button>
```

**After:**
```tsx
<Button disabled={loading}>
  {loading ? 'Searching...' : 'Search'}
</Button>
```

## Best Practices

1. **Match Content Structure**: Use skeleton components that closely match your actual content layout
2. **Consistent Count**: Show the same number of skeleton items as you typically display
3. **Appropriate Types**: Use specific skeleton types (flight, hotel, etc.) for better UX
4. **Loading States**: Combine with disabled states for buttons and forms
5. **Performance**: Skeleton components are lightweight and don't impact performance

## Customization

All skeleton components use MUI's theme system. You can customize colors, animations, and spacing by modifying the theme:

```tsx
// In your theme configuration
createTheme({
  components: {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
});
```

## Demo

Visit `/skeleton-demo` to see all skeleton components in action and get usage examples.

## File Structure

```
src/components/ui/
├── skeleton.tsx          # Main skeleton components
└── skeleton-README.md    # This documentation
```

## Contributing

When adding new skeleton components:

1. Follow the existing naming convention
2. Use MUI components and styling
3. Add proper TypeScript interfaces
4. Include usage examples in the demo
5. Update this README with new component documentation
