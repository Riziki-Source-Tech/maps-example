import React, { useMemo, Fragment, useRef } from "react";

import { Marker } from "@vis.gl/react-google-maps";
import convertNorthingEastingToGoogleMapsLatLong from "@/utils/convertLongLat";
import { useTheme } from "@mui/material";

export const PoiAllReports = ({ pois }: any) => {
  const theme = useTheme();
  const markerRefs = useRef<(google.maps.Marker | null)[]>([]);
  const isDarkMap = theme.palette.mode === "dark";

  const cleanedData =
    pois.map((report: any) => ({
      ...report,
      position: convertNorthingEastingToGoogleMapsLatLong(
        report.Northing,
        report.Easting
      ),
    })) || [];

  return (
    <>
      {cleanedData.map((report: any, index: number) => {
        <Fragment key={report["S/NO"]}>
          <Marker
            position={report.position}
            title={"demo marker"}
            onClick={() => console.log("Marker clicked:", report)}
            ref={(ref) => {
              markerRefs.current[report["S/NO"]] = ref;
            }}
            visible={true}
          />
        </Fragment>;
      })}
    </>
  );
};
