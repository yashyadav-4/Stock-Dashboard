import { useState, useCallback, useEffect } from "react";
import useDebounce from "./hooks/Debounce";
import useStockCache from "./hooks/StockCaching";
import { fetchStockQuote } from "./services/StockMarket";
import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorAlert from "./components/ErrorAlert";
import FallingStars from "./components/FallingStars";
import './App.css';

export default function App() {

    const [searchInputText, setSearchInputText] = useState('');
    const debouncedSearchSymbol = useDebounce(searchInputText, 800);
    const [instantSymbol, setInstantSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    const { getFromCache, addToCache } = useStockCache();

    const activeSymbol = instantSymbol || debouncedSearchSymbol;

    useEffect(() => {
        let cancelledByNewSearch = false;
        const trimmedSymbol = activeSymbol.trim();

        if (trimmedSymbol === '') {
            setStockData((current) => {
                if (current !== null) return null;
                return current;
            });
            setErrorInfo(null);
            setIsLoading(false);
            return;
        }

        async function lookUpStock() {
            setErrorInfo(null);

            const cachedResult = getFromCache(trimmedSymbol);

            if (cachedResult !== null) {
                if (cancelledByNewSearch) return;
                setStockData(cachedResult);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const freshData = await fetchStockQuote(trimmedSymbol);
                if (cancelledByNewSearch) return;
                addToCache(trimmedSymbol, freshData);
                setStockData(freshData);
                setErrorInfo(null);
            } catch (error) {
                if (cancelledByNewSearch) return;
                const errorType = error.type || 'UNKNOWN_ERROR';
                const errorMessage = error.message || 'An unexpected error occurred.';
                setErrorInfo({ type: errorType, message: errorMessage });
                setStockData(null);
            } finally {
                if (!cancelledByNewSearch) {
                    setIsLoading(false);
                }
            }
        }
        lookUpStock();
        return () => {
            cancelledByNewSearch = true;
        };
    }, [activeSymbol, getFromCache, addToCache]);

    useEffect(() => {
        if (instantSymbol !== '') {
            setInstantSymbol('');
        }
    }, [debouncedSearchSymbol]);

    const handleSearchInputChange = useCallback((newValue) => {
        setSearchInputText(newValue);
    }, []);

    const handleClearInput = useCallback(() => {
        setSearchInputText('');
        setInstantSymbol('');
    }, []);

    const handleInstantSearch = useCallback((value) => {
        const trimmed = value.trim();
        if (trimmed !== '') {
            setInstantSymbol(trimmed);
        }
    }, []);

    return (
        <div className="app-wrapper">
            <FallingStars />
            <header className="app-header">
                <div className="app-header-brand-container">
                    <h1 className="app-header-title">
                        <span className="title-dark">Stock</span><span className="title-blue">Dashboard</span>
                    </h1>
                    <span className="app-header-author">by Yash</span>
                </div>
                <p className="app-header-subtitle">
                    Real-time market insights, beautifully simple.
                </p>
            </header>

            <section className="app-search-section">
                <SearchBar
                    searchInputValue={searchInputText}
                    onSearchInputChange={handleSearchInputChange}
                    onClearInput={handleClearInput}
                    onInstantSearch={handleInstantSearch}
                />
            </section>

            <main className="app-content-area">
                {isLoading && <LoadingSpinner />}

                {!isLoading && errorInfo && (
                    <ErrorAlert
                        errorType={errorInfo.type}
                        errorMessage={errorInfo.message}
                    />
                )}

                {!isLoading && !errorInfo && stockData && (
                    <StockCard stockData={stockData} />
                )}

                {!isLoading && !errorInfo && !stockData && (
                    <div className="app-empty-state">
                        <div className="popular-searches-container">
                            <div className="popular-pills">
                                {['AAPL', 'TSLA', 'GOOGL', 'AMZN'].map((sym) => (
                                    <button
                                        key={sym}
                                        className="popular-pill"
                                        onClick={() => handleSearchInputChange(sym)}
                                    >
                                        {sym}
                                    </button>
                                ))}
                            </div>
                            <p className="popular-searches-label">POPULAR SEARCHES</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}