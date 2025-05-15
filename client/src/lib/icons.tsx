import React from 'react';

// Travel icons
export const PlaneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
  </svg>
);

export const PlaneDepartureIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22h20"></path>
    <path d="M6.36 17.4 4 17l-2-4 1.1-.5.9.6.2-2.9C4.5 8.5 6 7 7.7 7h.2c1.3 0 2.5.6 3.3 1.5l5.2 5.2c2.3 2.3 3.9 3.5 4.9 3.8a1 1 0 0 0 .8.1l.7-.3a1 1 0 0 0 .4-1.3l-.4-.8a2 2 0 0 0-1.1-1L16 13l-3.6-4.7c-1.4-1.8-3.5-2.9-5.8-3l-1.1-.1a3 3 0 0 0-3 3v1.3c0 1 .4 2 1.2 2.7l2.7 2.2Z"></path>
  </svg>
);

export const PlaneArrivalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22h20"></path>
    <path d="M3.77 10.77 2 9l2-4.5 1.1.55-.33.95.5-1c.15-.33.33-.67.56-.8.63-.34 1.54-.26 2.37.34l5.22 3.9c2.36 1.75 3.99 3.23 4.75 4.4.16.25.31.54.44.9l.26.9c.09.33-.02.67-.3.9l-.6.6c-.25.25-.61.35-.95.26l-.89-.23a8.7 8.7 0 0 1-1.21-.61L10 13l-5.46-1.45a1 1 0 0 0-.85.18l-.34.28c-.13.13-.25.29-.33.46Z"></path>
  </svg>
);

export const HotelIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5-7 5v12"></path>
    <path d="M9 22v-8h6v8"></path>
    <path d="M3 14h2"></path>
    <path d="M19 14h2"></path>
    <path d="M3 10h2"></path>
    <path d="M19 10h2"></path>
  </svg>
);

export const TrainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="16" rx="2"></rect>
    <path d="M4 11h16"></path>
    <path d="M12 3v8"></path>
    <path d="M8 19l-2 3"></path>
    <path d="M18 22l-2-3"></path>
    <path d="M8 15c0 1.1.9 2 2 2"></path>
    <path d="M14 15c0 1.1.9 2 2 2"></path>
  </svg>
);

export const BusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6v6"></path>
    <path d="M16 6v6"></path>
    <path d="M2 12h20"></path>
    <path d="M7 18h10"></path>
    <path d="M18 18v3"></path>
    <path d="M6 18v3"></path>
    <path d="M19 6H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
  </svg>
);

// Common UI icons
export const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
