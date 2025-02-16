'use client';

import React, { FC, useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon, LatLngTuple } from 'leaflet';

const ICON = icon({
  iconUrl: '/marker.png',
  iconSize: [50, 50],
});

interface MapProps {
  lat: number | undefined;
  lon: number | undefined;
}

const Map: FC<MapProps> = ({ lat, lon }) => {
  const defaultPosition = useMemo(() => [51.505, -0.09], []);
  const position = useMemo(() => {
    if (lat && lon) {
      return [lat, lon];
    }

    return defaultPosition;
  }, [lat, lon, defaultPosition]);

  return (
    <MapContainer
      data-testid='map'
      data-lat={position[0]}
      data-lon={position[1]}
      className='h-full w-full rounded-lg'
      center={position as LatLngTuple}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        data-testid='tile-layer'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        data-testid='marker'
        icon={ICON}
        position={position as LatLngTuple}
      />
    </MapContainer>
  );
};

export default Map;
