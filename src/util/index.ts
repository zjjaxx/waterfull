// 防抖
interface DebounceOrThrottle {
  (bindFn: (...args: any[]) => void, wait?: number): (...args: any[]) => void;
}
export const debounce: DebounceOrThrottle = (fn, wait = 200) => {
  let timer: number | undefined;

  return (...args) => {
    // 重置计时器
    if (timer) clearTimeout(timer);

    // 新计时器
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
