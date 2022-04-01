import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export const useAppStateChange = () => {
  const appState = useRef(AppState.currentState);

  const [
    currentAppState,
    setCurrentAppState,
  ] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setCurrentAppState(appState.current);
  };

  return {
    currentAppState,
  };
};
