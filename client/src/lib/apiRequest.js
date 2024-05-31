import axios from "axios";
import axiosRetry from "axios-retry";

const apiRequest = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api`,
  withCredentials: true,
});

// Configure axios-retry to retry a request up to 3 times with exponential delay
axiosRetry(apiRequest, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`Retry attempt: ${retryCount}`);
    return retryCount * 1000; // Exponential backoff: 1s, 2s, 3s
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status >= 500
    );
  },
});

export default apiRequest;
