import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ClassName from "classnames";
import { FC, useCallback, useRef, useState } from "react";

import { Coordinates } from "../../models/coordinates";
import { IPrometheusItemData } from "../PrometheusList/components/PrometheusItem/PrometheusItem";
import { MyCustomMarker } from "./components/MyCustomMarker";
import s from "./index.module.scss";
import { defaultMapTheme } from "./theme";

interface IProps {
  className?: string;
  center: Coordinates;
  isLoaded: boolean;
  selectedItem?: IPrometheusItemData;
  onSelectCoords: (coords: Coordinates, click?: boolean) => void;
}
const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map: FC<IProps> = ({
  className,
  center,
  isLoaded,
  selectedItem,
  onSelectCoords,
}) => {
  const mapRef = useRef(null);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);
  const handleSelectCoords = (e: any) => {
    const { lat, lng } = e.latLng;
    onSelectCoords({ lat: lat(), lng: lng() }, true);
  };
  return (
    <div className={ClassName(s.wrap, className)}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedItem ? selectedItem.coords : center}
          zoom={10}
          onLoad={onLoad}
          onClick={handleSelectCoords}
          onUnmount={onUnmount}
          options={{
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            clickableIcons: false,
            keyboardShortcuts: false,
            scrollwheel: false,
            disableDoubleClickZoom: false,
            fullscreenControl: false,
            styles: defaultMapTheme,
          }}
        >
          {selectedItem ? (
            <Marker position={selectedItem.coords} />
          ) : (
            <MyCustomMarker position={center} />
          )}
        </GoogleMap>
      ) : (
        <div className={s.loading}>Loading...</div>
      )}
    </div>
  );
};

export { Map };
