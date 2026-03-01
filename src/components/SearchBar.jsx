
export default function SearchBar({ searchInputValue, onSearchInputChange }) {
    function handleInputChange(e) {
        onSearchInputChange(e.target.value);
    }
    return (
        <div className="search-bar-wrapper">
            <input
                id="stock-search-input"
                className="search-bar-input"
                type="text"
                value={searchInputValue}
                onChange={handleInputChange}
                placeholder="Search by symbol (e.g., AAPL, TSLA)..."
                autoComplete="off"
                spellCheck="false"
            />
            <span className="search-bar-hint">RETURN</span>
        </div>
    );
}