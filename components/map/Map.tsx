'use client';

import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const ICON = icon({
  iconUrl: '/marker.png',
  iconSize: [50, 50],
});

interface MapProps {
  lat: number | undefined;
  lon: number | undefined;
}

const Map: FC<MapProps> = ({ lat, lon }) => {
  return (
    <MapContainer
      className='h-full w-full rounded-lg'
      center={lat && lon ? [lat, lon] : [51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        icon={ICON}
        position={lat && lon ? [lat, lon] : [51.505, -0.09]}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
