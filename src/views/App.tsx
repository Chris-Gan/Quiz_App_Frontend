import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Routes from 'Routes';

const App = () => {
    return (
        <ErrorBoundary>
            <Router basename="/">
                <Routes />
            </Router>
        </ErrorBoundary>
    );
};

export default App;
