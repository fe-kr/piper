export const debounce = <T extends () => unknown>(callback: T, idleTimeout: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastCallTimestamp: number = 0;
    
    return (...args: Parameters<T>) => {
        const callInterval = lastCallTimestamp - Date.now();
        
        if (callInterval < idleTimeout) {
            lastCallTimestamp = +Date.now();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(callback, idleTimeout, ...args);
        }
    }
}