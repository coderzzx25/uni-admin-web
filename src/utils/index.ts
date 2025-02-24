type DebouncedFunction<F extends (...args: any[]) => any> = (this: ThisParameterType<F>, ...arg: Parameters<F>) => void;
type ThrottledFunction<F extends (...args: any[]) => any> = (this: ThisParameterType<F>, ...arg: Parameters<F>) => void;

/**
 * 防抖函数：连续触发时，只在最后一次操作结束后执行目标函数
 * @template F - 目标函数类型
 * @param func - 需要防抖处理的原始函数
 * @param wait - 防抖等待时间（毫秒）
 * @returns 经过防抖处理的新函数，保留原始函数的 this 上下文和参数类型
 */
export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // 返回闭包函数，使用function声明已动态绑定this
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    // 每次调用都清除之前的定时器
    if (timeoutId) clearTimeout(timeoutId);

    // 设定新的定时器
    timeoutId = setTimeout(() => {
      // 使用箭头函数自动捕获外层this上下文
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * 节流函数：在指定时间间隔内，保证目标函数最多执行一次
 * @template F - 目标函数类型
 * @param func - 需要节流处理的原始函数
 * @param wait - 节流时间间隔（毫秒）
 * @returns 经过节流处理的新函数，支持首尾双执行保证
 */
export function throttle<F extends (...args: any[]) => any>(func: F, wait: number): ThrottledFunction<F> {
  // 上次执行时间戳
  let lastExecTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();
    const remaining = wait - (now - lastExecTime); // 剩余等待时间

    // 如果超过等待时间，立即执行并重置计时
    if (remaining <= 0) {
      // 执行前清除可能存在的延迟回调
      if (timeoutId) {
        clearTimeout(timeoutId); // 直接调用原始函数
        timeoutId = null; // 更新执行时间戳
      }
      func.apply(this, args);
      lastExecTime = now;
    } else if (!timeoutId) {
      // 设置剩余时间后的延迟执行
      timeoutId = setTimeout(() => {
        // 使用箭头函数捕获外层this
        func.apply(this, args);
        lastExecTime = Date.now(); // 更新执行时间戳
        timeoutId = null; // 清除定时器引用
      }, remaining);
    }
  };
}
