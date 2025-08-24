import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Mode } from "../types/state_types";
import { setMode, setTab } from "../store/GeneralSlice";
const FETCH_INTERVAL = 100; // 100ms interval for real-time updates

export const useModeFetching = () => {
  const dispatch = useDispatch();
  const previousDataRef = useRef<string | null>(null); // Ref to store the previous JSON string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.67.38.10:5800/api/mode");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const input: {mode: Mode, camera_id: number} = await response.json();

        // Serialize the fetched data into a string
        const currentDataString = JSON.stringify(input);

        // Compare the new JSON string with the previous one
        if (previousDataRef.current !== currentDataString) {
          // Update the previous data string
          previousDataRef.current = currentDataString;

          // Dispatch actions only if the data has changed
          dispatch(setMode(input.mode));
          dispatch(setTab(input.camera_id === -1 ? "Home" : input.camera_id));

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval
    const intervalId = setInterval(fetchData, FETCH_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [dispatch]);
};
