type LatLon = {
  lat: number;
  lng: number;
};

export default function convertNorthingEastingToGoogleMapsLatLong(
  northing: string,
  easting: string
): LatLon | null {
  // Remove 'N' and 'E' and parse as numbers
  const latValue = parseFloat(northing.replace("N", ""));
  const lonValue = parseFloat(easting.replace("E", ""));

  console.log("Parsed Values:", {
    lat: latValue,
    lng: lonValue,
  });

  // Basic validation to check if parsing was successful and values are within valid ranges
  if (isNaN(latValue) || isNaN(lonValue)) {
    console.error("Error: Could not parse Northing or Easting values.");
    return null;
  }

  if (latValue < -90 || latValue > 90) {
    console.error("Error: Latitude value is out of valid range (-90 to 90).");
    return null;
  }

  if (lonValue < -180 || lonValue > 180) {
    console.error(
      "Error: Longitude value is out of valid range (-180 to 180)."
    );
    return null;
  }

  return { lat: latValue, lng: lonValue };
}

// Your input values
const northingInput = "3.005630N";
const eastingInput = "35.506110E";

const googleMapsCoordinates = convertNorthingEastingToGoogleMapsLatLong(
  northingInput,
  eastingInput
);

if (googleMapsCoordinates) {
  console.log("Google Maps Results:", googleMapsCoordinates);

  // Example of how you'd use it with a Google Maps URL (for illustration)
  //   const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${googleMapsCoordinates.latitude},${googleMapsCoordinates.longitude}`;
  //   console.log("Google Maps URL:", googleMapsUrl);
}
