

export default function ErrorAlert({errorType , errorMessage}){
    let alertIcon = '⚠️';
    let alertTitle = 'Something Went Wrong';
    let alertClassName = 'error-alert error-alert-generic';

    if (errorType === 'SYMBOL_NOT_FOUND') {
        alertIcon = '🔍';
        alertTitle = 'Symbol Not Found';
        alertClassName = 'error-alert error-alert-not-found';
    } else if (errorType === 'INVALID_API_KEY') {
        alertIcon = '🔑';
        alertTitle = 'Invalid API Key';
        alertClassName = 'error-alert error-alert-api-key';
    } else if (errorType === 'RATE_LIMIT') {
        alertIcon = '⏱️';
        alertTitle = 'Rate Limit Exceeded';
        alertClassName = 'error-alert error-alert-rate-limit';
    } else if (errorType === 'NETWORK_ERROR') {
        alertIcon = '🌐';
        alertTitle = 'Network Error';
        alertClassName = 'error-alert error-alert-network';
    }

    return (
        <div className={alertClassName} role="alert">
            <div className="error-alert-header">
                <span className="error-alert-icon">{alertIcon}</span>
                <h3 className="error-alert-title">{alertTitle}</h3>
            </div>
            <p className="error-alert-message">{errorMessage}</p>
        </div>
    );
}