

export default function SearchBar({ searchInputValue, onSearchInputChange }) {

    function handleInputChange(e) {
        onSearchInputChange(e.target.value);
    }
    return (
        <div>
            <input
                id="stock-search-input"
                className="search-bar-input"
                type="text"
                value={searchInputValue}
                onChange={handleInputChange}
                placeholder="search us stocks only(e.g. AAPL, TSLA, MSFT)"
                autoComplete="off"
                spellCheck="false"
            />
        </div>
    )
}