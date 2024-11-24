'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useMapActions } from '../hooks/useMapActions';

export const MapContainer = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { initMap, onClick, onHover, onUnhover } = useMapActions();

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiYmVub2l0Y3JsdCIsImEiOiJjbTN1YWZjb2owZ213MnFzOXZ3aTNhYzRtIn0.pJVQH1i3_v5OIp9r3-oGGw';
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
            });
            map.on('load', () => initMap(map));
            map.on('mousemove', (e) => onHover(map, e));
            map.on('mouseout', (e) => onUnhover(map, e));
            map.on('click', (e) => onClick(map, e));
            return () => map.remove();
        }
    }, [initMap, onClick, onHover, onUnhover]);

    return (
        <div
            id="map-container"
            className="h-full w-full absolute"
            ref={mapContainerRef}
        ></div>
    );
};
