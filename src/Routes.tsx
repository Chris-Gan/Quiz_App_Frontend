import { Typography } from '@mui/material';
import React from 'react';
import { Routes as RoutesWrapper, Route } from 'react-router-dom';

const Routes = () => {
    return (
        <RoutesWrapper>
            <Route index element={<Typography>Chris personal template</Typography>} />
        </RoutesWrapper>
    );
};

export default Routes;
