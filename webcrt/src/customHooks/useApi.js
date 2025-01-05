import { useState, useCallback } from 'react';

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to call the API with dynamic params
  const fetchData = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(params); // Pass the payload (params)
      setData(response.data);
    } catch (err) {
      console.error("error", err)
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, callApi: fetchData }; // Expose the callApi method
};

export default useApi;
