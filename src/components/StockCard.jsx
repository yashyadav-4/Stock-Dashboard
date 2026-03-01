
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
        <div>
            <div>
                <h2>{companyName}</h2>
                <span> {tickerSymbol} </span>
            </div>

            <div>
                <span>current Price</span>
                <span>{currencyFormatting(currPrice)}</span>
            </div>

            <div>
                <div>
                    <span> Day High</span>
                    <span> {currencyFormatting(dayHigh)} </span>
                </div>
                <div>
                    <span> Day Low</span>
                    <span> {currencyFormatting(dayLow)} </span>
                </div>
            </div>

            <div>
                <span>Last Updated</span>
                <span> {currencyFormatting(lastUpdated)} </span>
            </div>

        </div>
    )
}