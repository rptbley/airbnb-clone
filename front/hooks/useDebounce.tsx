import { useEffect, useState } from "react"


const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncdValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncdValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])

    return debouncedValue;
}

export default useDebounce;