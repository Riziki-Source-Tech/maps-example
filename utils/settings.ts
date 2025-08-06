import * as https from "https";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const settings = {
  name: "DigiSOC Portal",
  version: "1.13.2-dev",
  releaseName: "Achayo",
  description: "Admin for the DigiSOC Platform",
  httpsAgent,
  enableOTPAsDefaultLogin: false,
  isDev: process.env.NODE_ENV === "development",
  enableSessionManagement: true,

  googleMapsAPIKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string,
};

export default settings;
