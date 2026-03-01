
export default function StockCard({ stockData }) {

    const companyName = stockData.companyName;
    const currPrice = stockData.price;
    const dayHigh = stockData.dayHigh;
    const dayLow = stockData.dayLow;
    const lastUpdated = stockData.lastUpdated;
    const tickerSymbol = stockData.symbol;

    function currencyFormatting(value) {
        return '$' + Number(value).toFixed(2);
    }

    return (
        <div className="stock-card">
            <div className="stock-header">
                <div>
                    <h2 className="stock-company-name">{companyName}</h2>
                    <span className="stock-symbol">{tickerSymbol}</span>
                </div>
                <div className="stock-price-container">
                    <p className="stock-price-label">Current Price</p>
                    <p className="stock-price-value">{currencyFormatting(currPrice)}</p>
                </div>
            </div>

            <div className="stock-details">
                <div className="stock-detail-item">
                    <span className="stock-detail-label">Day High</span>
                    <span className="stock-detail-value" style={{ color: 'var(--success)' }}>
                        {currencyFormatting(dayHigh)}
                    </span>
                </div>
                <div className="stock-detail-item">
                    <span className="stock-detail-label">Day Low</span>
                    <span className="stock-detail-value" style={{ color: 'var(--danger)' }}>
                        {currencyFormatting(dayLow)}
                    </span>
                </div>
            </div>

            <div className="stock-footer">
                Last Updated: {lastUpdated}
            </div>
        </div>
    );
}