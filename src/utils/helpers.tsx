import { get } from "lodash-es";

export const debounce = (fn: () => void, delay: number, timeoutId: number): void => {
  clearTimeout(timeoutId);
  setTimeout(() => {
    fn();
  }, delay);
};

export const getFile = (event: React.ChangeEvent<HTMLInputElement>) =>
  get(event, 'target.files[0]');