export function useRetry(
    func: ((...args: any) => any) |
          ((...args: any) => Promise<any>),
    retryCount: number,
) {
    let currentRetryCount: number;

    return async(...args: any) => {
        try {
            return await func(...args);
        }
        catch {
            currentRetryCount++;
            if (currentRetryCount > retryCount) {
                return;
            }

            return;
        }
    };
}
