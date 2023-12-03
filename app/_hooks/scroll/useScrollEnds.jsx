import { useState } from 'react';

export default function useScrollEnds(initialState) {
  const [scrollEnds, setScrollEnds] = useState(initialState);

  function getScrollStateForElement(element) {
    const { scrollLeft, scrollWidth, clientWidth } = element;
    const isAtLeftEnd = scrollLeft === 0;
    const isAtRightEnd = scrollLeft === scrollWidth - clientWidth;
    const isOverflowed = scrollWidth > clientWidth;

    return {
      left: isAtLeftEnd,
      right: isAtRightEnd,
      overflowed: isOverflowed,
    };
  }

  function handleScroll(ref, id) {
    if (ref && ref.current) {
      const state = getScrollStateForElement(ref.current);
      setScrollEnds(prev => ({ ...prev, [id]: state }));
    }
  }

  return { scrollEnds, handleScroll };
}