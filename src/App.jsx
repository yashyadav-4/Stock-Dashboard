import { useState, useCallback, useEffect } from "react";
import useDebounce from "./hooks/Debounce";
import useStockCache from "./hooks/StockCaching";
import { fetchStockQuote } from "./services/StockMarket";
import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorAlert from "./components/ErrorAlert";
export default function App() {

    const [searchInputText, setSearchInputText] = useState('');
    const debouncedSearchSymbol = useDebounce(searchInputText, 800);
    const [stockData, setStockData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    const { getFromCache, addToCache } = useStockCache();

    useEffect(() => {
        let cancelledByNewSearch = false;
        const trimmedSymbol = debouncedSearchSymbol.trim();

        if (trimmedSymbol === '') {
            setStockData(null);
            setErrorInfo(null);
            setIsLoading(false);
            return;
        }

        async function lookUpStock() {
            setErrorInfo(null);

            const cachedResult = getFromCache(trimmedSymbol);

            if (cachedResult !== null) {
                if (cancelledByNewSearch) {
                    return;
                }
                setStockData(cachedResult);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setStockData(null);

            try {
                const freshData = await fetchStockQuote(trimmedSymbol);
                if (cancelledByNewSearch) {
                    console.log(`[Cancelled] Ignoring stale result for "${trimmedSymbol}"`);
                    return;
                }
                addToCache(trimmedSymbol, freshData);
                setStockData(freshData);
                setErrorInfo(null);
            } catch (error) {
                if (cancelledByNewSearch) {
                    return;
                }
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
    }, [debouncedSearchSymbol, getFromCache, addToCache]);

    const handleSearchInputChange = useCallback((newValue) => {
        setSearchInputText(newValue);
    }, []);


    return (
        <div className="app-wrapper">

            <header className="app-header">
                <div className="app-header-brand">
                    <svg className="app-header-logo" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                    </svg>
                    <h1 className="app-header-title">Stock Search Dashboard</h1>
                </div>
                <p className="app-header-subtitle">
                    Real-time U.S. stock quotes powered by Financial Modeling Prep
                </p>
            </header>

            <section className="app-search-section">
                <SearchBar
                    searchInputValue={searchInputText}
                    onSearchInputChange={handleSearchInputChange}
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
                        <div className="app-empty-state-icon">📈</div>
                        <p className="app-empty-state-text">
                            Type a U.S. stock ticker above to get started
                        </p>
                        <p className="app-empty-state-hint">
                            Try AAPL, TSLA, MSFT, GOOGL, or AMZN
                        </p>
                    </div>
                )}
            </main>

            <footer className="app-footer">
                <p>Data provided by Financial Modeling Prep · Results are cached per session</p>
            </footer>
        </div>
    );
}