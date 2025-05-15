import { useLocation } from 'wouter';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom hook to get URL search parameters
 */
export function useSearchParams() {
  const [location] = useLocation();
  
  // Get the query string from the location
  const queryString = location.includes('?') 
    ? location.substring(location.indexOf('?') + 1) 
    : '';
  
  // Parse query string into an object
  const params = new URLSearchParams(queryString);
  
  // Function to get a specific parameter
  const getParam = (key: string): string | null => {
    return params.get(key);
  };
  
  return { getParam };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Generate range of numbers
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}