import { lazy } from 'react';
import Navbar from 'components/Navbar';
import ProtectedRoute from './ProtectedRoute';

const Login = lazy(() => import('../views/Login'));
const Quiz = lazy(() => import('../views/Quiz'));
const Result = lazy(() => import('../views/Result'));

const indexRoutes = [
    { path: '', name: 'Login Page', component: <Login /> },
    {
        path: '/quiz',
        name: 'Quiz Page',
        component: (
            <ProtectedRoute>
                <Navbar>
                    <Quiz />
                </Navbar>
            </ProtectedRoute>
        ),
    },
    {
        path: '/result',
        name: 'Result Page',
        component: (
            <ProtectedRoute>
                <Navbar>
                    <Result />
                </Navbar>
            </ProtectedRoute>
        ),
    },
];

export default indexRoutes;
