import { useCallback, useRef } from "react";

const cachingPrefix = 'stock_cache_';

export default function useStockCache() {
    const inMemoryCache = useRef(new Map());

    const getFromCache = useCallback((symbol) => {
        const s = symbol.trim().toUpperCase();

        const inMemoryRes = inMemoryCache.current.get(s);
        if (inMemoryRes) {
            console.log('cache found from inMemory for ->', s);
            return inMemoryRes;
        }

        const sessionStorageKey = cachingPrefix + s;
        const storedJsonString = sessionStorage.getItem(sessionStorageKey);

        if (sessionStorageKey) {
            try {
                const data = JSON.parse(storedJsonString);
                inMemoryCache.current.set(s, data);
                console.log('this time cache found from sessionStorage for ->', s);
                return data;
            } catch (error) {
                console.log('failed to parse sessionStorage for -> ', s);
                return null;
            }
        }

        console.log('didnt find anything in cache for -> ', s);
        return null;
    }, []);

    const addToCache = useCallback((symbol, data) => {
        const s = symbol.trim().toUpperCase();

        inMemoryCache.current.set(s, data);

        const datainjson = JSON.stringify(data);
        const sessionStorageKey = cachingPrefix + s;
        sessionStorage.setItem(sessionStorageKey, datainjson);

        console.log(`data stored for ${s} in session storage and inMemory map`);
    }, []);
    return { getFromCache, addToCache };
}