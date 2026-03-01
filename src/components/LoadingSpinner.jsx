
export default function LoadingSpinner() {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner-ring" />
            <p className="loading-spinner-text">Fetching stock data...</p>
        </div>
    );
}