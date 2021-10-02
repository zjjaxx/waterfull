//节流
export const throttle = (fn: () => void, time: number): (() => void) => {
  let timer: null | number = null;
  return () => {
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, time);
  };
};