import React, { useRef, useEffect } from 'react';
import { isValidLocation } from './utils';
import { PickerProps } from './types';
import { Loader } from '@googlemaps/js-api-loader';

const Picker = (props: PickerProps) => {
  const {
    apiKey,
    defaultLocation,
    zoom = 7,
    onChangeLocation,
    onChangeZoom,
    style,
    className,
    mapTypeId,
  } = props;
  const MAP_VIEW_ID = `google-map-view-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const map = useRef<any>(null);
  const marker = useRef<any>(null);

  const componentStyle = Object.assign(
    { width: '100%', height: '600px' },
    style || {}
  );

  const handleChangeLocation = (e: any) => {
    if (onChangeLocation) {
      if (e.latLng) {
        const currentLocation = e.latLng;
        onChangeLocation(currentLocation.lat(), currentLocation.lng());
      } else if (e.lat && e.lng) {
        onChangeLocation(e.lat(), e.lng());
      }
    }
  };

  const handleChangeZoom = () => {
    onChangeZoom && onChangeZoom(map.current.getZoom());
  };

  const loadMap = async () => {
    const validLocation = isValidLocation(defaultLocation)
      ? defaultLocation
      : { lat: 0, lng: 0 };

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
    });

    loader.load().then(async () => {
      const validLocation = isValidLocation(defaultLocation)
        ? defaultLocation
        : { lat: 0, lng: 0 };
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      map.current = new Map(document.getElementById(MAP_VIEW_ID)!, {
        center: validLocation,
        zoom: zoom,
        mapId: MAP_VIEW_ID,
        ...(mapTypeId && { mapTypeId }),
      });
    });
    
    if (!marker.current) {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as any;

      marker.current = new AdvancedMarkerElement({
        title: 'Selected location',
        position: validLocation,
        map: map.current,
        gmpDraggable: true,
      });
      google.maps.event.addListener(
        marker.current,
        'dragend',
        handleChangeLocation
      );
    } else {
      marker.current.position = validLocation;
    }
    map.current.addListener('click', function(event: any) {
      const clickedLocation = event.latLng;

      marker.current.position = clickedLocation;
      handleChangeLocation(clickedLocation);
    });

    map.current.addListener('zoom_changed', handleChangeZoom);
  };

  useEffect(() => {
    if (marker.current) {
      map.current.setCenter(defaultLocation);
      marker.current.position = defaultLocation;
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    (async () => {
      // await loadScript(apiKey);
      await loadMap()
    })()
  }, []);

  return <div id={MAP_VIEW_ID} style={componentStyle} className={className} />;
};
export default Picker;
