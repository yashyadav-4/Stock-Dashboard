
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/stable';

export async function fetchStockQuote(symbol) {

    if (!API_KEY || API_KEY === 'your_api_key_here') {
        const apiKeyError = new Error(
            'API key is missing'
        );
        apiKeyError.type = 'INVALID_API_KEY';
        throw apiKeyError;
    }

    const s = symbol.trim().toUpperCase();
    const req = BASE_URL + '/quote?symbol=' + s + '&apikey=' + API_KEY;

    let res;
    try {
        res = await fetch(req);
    } catch (e) {
        const error = new Error(
            'Could not connect to the stock data service. Please check your internet connection.'
        );
        error.type = 'NETWORK_ERROR';
        throw error;
    }

    if (res.status === 403 || res.status === 401) {
        const error = new Error(
            'Invalid API key'
        );
        error.type = 'INVALID_API_KEY';
        throw error;
    }

    if (res.status === 402) {
        const error = new Error(
            'This endpoint requires a paid API plan'
        );
        error.type = 'INVALID_API_KEY';
        throw error;
    }

    if (res.status === 429) {
        const error = new Error(
            'Rate limit exceeded'
        );
        error.type = 'RATE_LIMIT';
        throw error;
    }

    if (!res.ok) {
        const error = new Error(
            `Unexpected error from the API (status ${res.status}). Please try again later.`
        );
        error.type = 'UNKNOWN_ERROR';
        throw error;
    }

    let Data;
    try {
        Data = await res.json();
    } catch (e) {
        const error = new Error('Failed to read the response from the stock data service.');
        error.type = 'UNKNOWN_ERROR';
        throw error;
    }

    const result = Data && Array.isArray(Data) && Data.length !== 0;
    if (!result) {
        const error = new Error(
            `No stock data found for symbol "${s}". Please check the ticker and try again.`
        );
        error.type = 'SYMBOL_NOT_FOUND';
        throw error;
    }

    const needed = Data[0];
    const stockData = {
        companyName: needed.name || 'Unknown Company',
        price: needed.price ?? 0,
        dayHigh: needed.dayHigh ?? 0,
        dayLow: needed.dayLow ?? 0,
        lastUpdated: formatTimestamp(needed.timestamp),
        symbol: s,
    }
    return stockData;
}

function formatTimestamp(unixTimestamp) {
    let dateObject;
    if (unixTimestamp) {
        dateObject = new Date(unixTimestamp * 1000);
    } else {
        dateObject = new Date();
    }
    const formattedString = dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    });

    return formattedString;
}