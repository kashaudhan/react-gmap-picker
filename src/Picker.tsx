import React, { useRef, useEffect } from 'react';
import { loadScript, isValidLocation } from './utils';
import { PickerProps } from './types';

const GOOGLE_SCRIPT_URL =
  'https://maps.googleapis.com/maps/api/js?libraries=places&key=';

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
    icon,
  } = props;
  const MAP_VIEW_ID = `google-map-view-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const map = useRef<any>(null);
  const marker = useRef<any>(null);

  const handleChangeLocation = () => {
    if (onChangeLocation) {
      const currentLocation = marker.current.getPosition();
      onChangeLocation(currentLocation.lat(), currentLocation.lng());
    }
  };

  const handleChangeZoom = () => {
    onChangeZoom && onChangeZoom(map.current.getZoom());
  };

  const loadMap = () => {
    const Google = window.google;
    const validLocation = isValidLocation(defaultLocation)
      ? defaultLocation
      : { lat: 0, lng: 0 };

    map.current = new Google.maps.Map(document.getElementById(MAP_VIEW_ID)!, {
      center: validLocation,
      zoom: zoom,
      ...(mapTypeId && { mapTypeId }),
    });

    if (!marker.current) {
      marker.current = new Google.maps.Marker({
        position: validLocation,
        map: map.current,
        draggable: true,
        icon,
      });
      Google.maps.event.addListener(
        marker.current,
        'dragend',
        handleChangeLocation
      );
    } else {
      marker.current.setPosition(validLocation);
    }

    map.current.addListener('click', function(event: any) {
      const clickedLocation = event.latLng;

      marker.current.setPosition(clickedLocation);
      handleChangeLocation();
    });

    map.current.addListener('zoom_changed', handleChangeZoom);
  };

  useEffect(() => {
    loadScript(GOOGLE_SCRIPT_URL + apiKey, 'google-maps-' + apiKey).then(
      loadMap
    );
  }, []);

  useEffect(() => {
    if (marker.current) {
      map.current.setCenter(defaultLocation);
      marker.current.setPosition(defaultLocation);
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  const componentStyle = Object.assign(
    { width: '100%', height: '600px' },
    style || {}
  );

  return <div id={MAP_VIEW_ID} style={componentStyle} className={className} />;
};
export default Picker;
