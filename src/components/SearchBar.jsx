export default function SearchBar({ searchInputValue, onSearchInputChange, onClearInput, onInstantSearch }) {
    function handleInputChange(e) {
        onSearchInputChange(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onInstantSearch(searchInputValue);
        }
    }

    const showClearButton = searchInputValue.length > 0;

    return (
        <div className="search-bar-wrapper">
            <input
                id="stock-search-input"
                className="search-bar-input"
                type="text"
                value={searchInputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search by symbol (e.g., AAPL, TSLA)..."
                autoComplete="off"
                spellCheck="false"
            />
            {showClearButton && (
                <button
                    className="search-bar-clear-btn"
                    onClick={onClearInput}
                    aria-label="Clear search"
                    type="button"
                >
                    ×
                </button>
            )}
        </div>
    );
}