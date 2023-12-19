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

// const debounced = debounce<exampleArgs, void>(example, 100);
// debounced({
//     arg1: 1,
//     arg2: 2,
// });
