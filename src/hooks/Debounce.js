import { useEffect, useState } from "react";


export default function useDebounce(value, Delay = 800) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const timer= setTimeout(()=>{
            setDebounceValue(value);
        } , Delay);

        return ()=>{
            clearTimeout(timer);
        }
    } , [value , Delay]);
    return debounceValue;
}