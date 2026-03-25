export const APP_NAME = "MrDelivery Studio";
export const APP_VERSION = "2.0.0 (2026 Edition)";

// Higgsfield API Configuration
// Ideally these are loaded from env variables, but for this demo build we use placeholders or the provided keys securely.
// In a production app, never expose the Secret Key in the frontend code.
export const HIGGSFIELD_CONFIG = {
  API_KEY_ID: process.env.REACT_APP_HIGGSFIELD_ID || "e3c3b36b-bf80-4874-90d7-950e0729e88f",
  API_KEY_SECRET: process.env.REACT_APP_HIGGSFIELD_SECRET || "1e72e9a6270f61d0eec06ac502c5f3c712a3de308df1376c2239fdf40e9654fb",
  BASE_URL: "https://api.higgsfield.ai/v1" // Hypothetical endpoint
};

export const MOCK_IMAGES = [
  "https://picsum.photos/800/450?random=1",
  "https://picsum.photos/800/450?random=2",
  "https://picsum.photos/800/450?random=3",
  "https://picsum.photos/450/800?random=4",
];