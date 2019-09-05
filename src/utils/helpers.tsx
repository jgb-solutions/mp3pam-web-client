
export const debounce = (fn: () => void, delay: number, timeoutId: number): void => {
  clearTimeout(timeoutId);
  setTimeout(() => {
    fn();
  }, delay);
};

