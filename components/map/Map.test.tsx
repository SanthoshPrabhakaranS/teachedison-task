import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from './Map';
import React from 'react';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='map'>{children}</div>
  ),
  TileLayer: () => <div data-testid='tile-layer' />,
  Marker: () => <div data-testid='marker' />,
}));

// Mock leaflet icon function
jest.mock('leaflet', () => ({
  icon: jest.fn(() => ({})),
}));

describe('Map Component', () => {
  test('renders map component', () => {
    render(<Map lat={51.505} lon={-0.09} />);
    const element = screen.getByTestId('map');
    expect(element).toBeInTheDocument();
  });

  test('renders tile layer', () => {
    render(<Map lat={51.505} lon={-0.09} />);
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer).toBeInTheDocument();
  });

  test('renders marker', () => {
    render(<Map lat={51.505} lon={-0.09} />);
    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
  });
});
