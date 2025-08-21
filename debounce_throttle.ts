// Debounce/throttle a function - Control how often a function is invoked by noisy events.

// We need a way to Limit how often Fun's runs
// Debounce - Wait untill the user stops
// Throttle - Run at most every X mili-sections

// leading - run at  the start of the window.
// trailing - run at the end of the window. 

// timer - a setTimeout handle we use to delay work. 



export function debounce<T extends (...a: any[]) => any> (
    fn: T, wait: number, {leading = false, trailing = true} = {}
): (...a: Parameters<T>) => void {

    let timer: ReturnType<typeof setTimeout> | null = null;

    let lastArgs: Parameters<T> | null = null, lastThis: any;

    return function debounce(this: any, ...args: Parameters<T>) {
        lastArgs = args; 
        lastThis = this;

        const callNow = leading && !timer;

        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;
            if(trailing && lastArgs) {
                fn.apply(lastThis, lastArgs);
                lastArgs = lastThis = null;
            }
        }, wait);

        if(callNow) {
            fn.apply(lastThis, lastArgs);
            lastArgs = lastThis = null;
        }
    };




    export function throttle<T extends (...a: any[]) => any> (
        fn: T, wait: number, {leading = true, trailing = true} = {}
    ): (...a: Parameters<T>) => void {

        let last = 0, timer: ReturnType<typeof setTimeout> | null = null;

        let lastArgs: Parameters<T> | null = null, lastThis: any;

        return function throttle(this:any, ...args: Parameters<T>) { 
            const now = Date.now();

            if(!last && !leading) last = now;

            const remaining = wait - (now - last);

            lastArgs = args;
            lastThis = this;

            if(remaining <= 0 || remaining > wait) {
                
                if(timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                last = now;
                fn.apply(lastThis, lastArgs);
                lastArgs = lastThis = null;
            }
            else if (!timer && trailing) {
                timer = setTimeout(() => {
                    last = leading ? Date.now() : 0;
                    timer = null;

                    if(lastArgs) {
                        fn.apply(lastThis, lastArgs);
                        lastArgs = lastThis = null;
                    }
                }, remaining);
            }
        };
    }

}
