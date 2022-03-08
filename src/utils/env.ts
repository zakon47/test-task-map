const IS_DEV = process.env.NODE_ENV || "";

export const ENV = {
  IS_DEV: IS_DEV !== "production",
  GOOGLE_MAP_KEY: process.env.REACT_APP_GOOGLE_MAP_KEY || "",
  BACKEND_API: process.env.REACT_APP_BACKEND_API || "",
  BACKEND_API_KEY: process.env.REACT_APP_BACKEND_API_KEY || "",
};
