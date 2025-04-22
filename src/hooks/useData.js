import { useState } from "react";

const useData = ({ isLoading, setIsLoading }) => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    try {
      setIsLoading(true);
      const result = await fetch("https://qapi.vercel.app/api/quotes");
      const response = await result.json();
      setData(response);
    } catch (error) {
      alert("something went bad" + " " + error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    data,
    loadData,
  };
};
export default useData;
