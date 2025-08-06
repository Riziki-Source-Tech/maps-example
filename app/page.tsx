"use client";

import React, { useState, useEffect, useMemo, Fragment, useRef } from "react";

import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import { useColorScheme } from "@mui/material";

import settings from "@/utils/settings";
import { allReports } from "@/utils/reports";
import convertNorthingEastingToGoogleMapsLatLong from "@/utils/convertLongLat";

export default function Home() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [mapKey, setMapKey] = useState(Date.now());
  useEffect(() => {
    // Regenerate the map key when the color scheme changes
    setMapKey(Date.now());
  }, [colorScheme]);
  const isDarkMap = colorScheme === "dark";
  const infoWindowPosition = { lat: -0.0751827, lng: 38.1807772 };

  const map_id = isDarkMap ? "d6f6ed0e2487095d" : "1140402f65a2ce26";
  const [isMarkerVisible, setIsMarkerVisible] = useState(false);
  const [zoom, setZoom] = useState(7);

  const cleanedData = useMemo(() => {
    return allReports
      .map((report: any) => ({
        ...report,
        position: convertNorthingEastingToGoogleMapsLatLong(
          report.Northing,
          report.Easting
        ),
      }))
      .filter((report: any) => report.position !== null);
  }, [allReports]);

  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number>();
  const markerRefs = useRef<(google.maps.Marker | null)[]>([]);

  const handleMarkerClick = (index: number) => {
    setActiveMarkerIndex(index);
    // setIsMarkerVisible(true);
  };

  const handleInfoWindowClose = () => {
    setActiveMarkerIndex(undefined);
  };

  return (
    <APIProvider
      apiKey={settings.googleMapsAPIKey}
      onLoad={() => console.info("Maps API has loaded.")}
      onError={(error) => console.error("Maps API error:", error)}
    >
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultZoom={zoom}
        key={mapKey} // Apply the dynamic key here
        // gestureHandling={"greedy"}
        // disableDefaultUI={true}
        defaultCenter={{ lat: -0.0751827, lng: 38.1807772 }}
        mapId={map_id}
        scaleControl={true}
      >
        {cleanedData.map((report: any, index: number) => (
          <Fragment key={index}>
            <Marker
              ref={(ref) => {
                markerRefs.current[index] = ref;
              }}
              position={report.position}
              title={report["Project Name"]}
              onClick={() => handleMarkerClick(index)}
            />
            {activeMarkerIndex === index && (
              <InfoWindow
                anchor={markerRefs.current[index]}
                position={report.position}
                onClose={handleInfoWindowClose}
                style={{ backgroundColor: "black", padding: "0px" }}
              >
                <div>
                  <h2>{report["Project Name"]}</h2>
                  <p>Details about the marker can go here.</p>
                </div>
              </InfoWindow>
            )}
          </Fragment>
        ))}
      </Map>
    </APIProvider>
  );
}
