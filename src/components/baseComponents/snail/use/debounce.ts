// На самом деле тут Return не нужен, но если писать либу - обязателен
export function useDebounce<Args, Return>(
    func: (args: Args) => Return,
    timeoutMs: number,
) {
    let lastCall: number, lastCallTimer: NodeJS.Timeout;

    return (args: Args) => {
        const previousCall = lastCall;

        lastCall = Date.now();

        if (previousCall && lastCall - previousCall <= timeoutMs) {
            clearTimeout(lastCallTimer);
        }

        lastCallTimer = setTimeout(() => func(args), timeoutMs);
    };
}
