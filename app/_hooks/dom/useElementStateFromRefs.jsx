import { useState, useEffect } from 'react';

export default function useElementStateFromRefs(refs, determineState) {
  const [elementsState, setElementsState] = useState({});

  useEffect(() => {
    const initialStates = {};

    Object.keys(refs).forEach(key => {
      const currentRef = refs[key];
      if (currentRef && currentRef.current) {
        const state = determineState(currentRef.current);
        initialStates[key] = state;
      }
    });

    setElementsState(initialStates);
  }, [refs, determineState]);

  useEffect(() => {
    Object.keys(refs).forEach(key => {
      const element = refs[key]?.current;
      if (element) {
        const state = determineState(element);
        setElementsState(prev => ({
          ...prev,
          [key]: state
        }));
      }
    });
  }, [refs, determineState]);

  return elementsState;
}
