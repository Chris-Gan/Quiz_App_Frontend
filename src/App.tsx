import { CssBaseline, GlobalStyles } from '@mui/material';
import CircularLoader from 'components/CircularLoader';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from 'context/Provider';
import mainRoutes from './routes';

const App = () => {
    return (
        <ErrorBoundary>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                    },
                }}
            />
            <Provider>
                <BrowserRouter>
                    <Suspense fallback={<CircularLoader isLoading />}>
                        <Routes>
                            {mainRoutes.map((route) => (
                                <Route key={route.name} path={route.path} element={route.component} />
                            ))}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
