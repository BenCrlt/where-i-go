import { LngLatLike, Map, MapMouseEvent } from 'mapbox-gl';

const EUROPE_CENTER: LngLatLike = [16.958, 48.3];

interface MapActions {
    initMap: (map: Map) => void;
    onHover: (map: Map, e: MapMouseEvent) => void;
    onUnhover: (map: Map, e: MapMouseEvent) => void;
    onClick: (map: Map, e: MapMouseEvent) => void;
}

export const useMapActions = (): MapActions => {
    const initMap = (map: Map) => {
        map.setConfigProperty('basemap', 'showRoadLabels', false);
        map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
        map.flyTo({
            center: EUROPE_CENTER,
            zoom: 3,
            curve: 1,
            easing(t) {
                return t;
            },
        });

        map.addSource('cbs', {
            // country-boundaries-simplified
            type: 'geojson',
            data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson',
        });

        map.addLayer({
            id: 'cf', // country-fills
            type: 'fill',
            source: 'cbs',
            layout: {},
            paint: {
                'fill-color': '#627BC1',
                'fill-opacity': 0.9,
            },
        });

        map.addLayer({
            id: 'cb', // country borders
            type: 'line',
            source: 'cbs',
            layout: {},
            paint: {
                'line-color': '#627BC1',
                'line-width': 2,
            },
        });

        map.addLayer({
            id: 'cfh', // country-fills-hover",
            type: 'fill',
            source: 'cbs',
            layout: {},
            paint: {
                'fill-color': '#FFFFFF',
                'fill-opacity': 1,
            },
            filter: ['==', 'name', ''],
        });
    };

    const onHover = (map: Map, e: MapMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['cf'],
        });

        if (features.length && features[0]?.properties?.name) {
            map.getCanvas().style.cursor = 'pointer';
            map.setFilter('cfh', ['==', 'name', features[0].properties.name]);
        } else {
            map.setFilter('cfh', ['==', 'name', '']);
            map.getCanvas().style.cursor = '';
        }
    };

    const onUnhover = (map: Map, e: MapMouseEvent) => {
        map.getCanvas().style.cursor = 'auto';
        map.setFilter('cfh', ['==', 'name', '']);
    };

    const onClick = (map: Map, e: MapMouseEvent) => {
        const [feature] = map.queryRenderedFeatures(e.point, {
            layers: ['cf'],
        });
        if (!feature?.properties) {
            return;
        }
        map.flyTo({
            center: e.lngLat,
            zoom: 5,
            curve: 1,
            easing(t) {
                return t;
            },
        });
    };

    return {
        initMap,
        onHover,
        onUnhover,
        onClick,
    };
};
