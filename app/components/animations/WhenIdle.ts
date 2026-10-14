type IdleWindow = Window & {
    requestIdleCallback?: (
      cb: () => void,
      options?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  
  /**
   * Jalankan callback saat browser idle (fallback: setTimeout).
   * Mengembalikan fungsi pembatal untuk dipanggil di cleanup useEffect.
   */
  export function whenIdle(
    callback: () => void,
    { timeout = 1500, fallbackDelay = 600 } = {},
  ): () => void {
    const w = window as IdleWindow;
  
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(callback, { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
  
    const id = w.setTimeout(callback, fallbackDelay);
    return () => w.clearTimeout(id);
  }