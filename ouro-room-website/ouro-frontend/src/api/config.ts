const getApiUrl = () => {
  const defaultUrl = import.meta.env.VITE_API_URL;

  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return 'http://127.0.0.1:8002';  // Local Django backend
  }

  return defaultUrl;  // Production API
};

export const API = getApiUrl();