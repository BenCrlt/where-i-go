'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export const MapContainer = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiYmVub2l0Y3JsdCIsImEiOiJjbTN1YWZjb2owZ213MnFzOXZ3aTNhYzRtIn0.pJVQH1i3_v5OIp9r3-oGGw';
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
            });
            return () => map.remove();
        }
    }, []);
    return (
        <div
            id="map-container"
            className="h-full w-full absolute"
            ref={mapContainerRef}
        ></div>
    );
};
