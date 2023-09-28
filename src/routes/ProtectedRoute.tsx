import CircularLoader from 'components/CircularLoader';
import { FC, Suspense, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    redirectedPath?: string;
    children?: ReactNode;
}
const ProtectedRoute: FC<Props> = ({ redirectedPath, children }) => {
    if (!sessionStorage.getItem('user')) {
        return <Navigate to={redirectedPath || ''} replace />;
    }
    return <Suspense fallback={<CircularLoader isLoading />}>{children}</Suspense>;
};

export default ProtectedRoute;

ProtectedRoute.defaultProps = {
    redirectedPath: '/',
    children: undefined,
};
