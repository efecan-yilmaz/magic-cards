import { Navigate, OutletProps, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC<OutletProps> = props => {
    const user = null;

    if (!user) return <Navigate replace to="/login" />

    return <Outlet {...props} />
}

export default PrivateRoute;