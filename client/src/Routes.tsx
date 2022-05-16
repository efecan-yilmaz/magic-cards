import { BrowserRouter as Router, Route, Routes as RRoutes } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';
import Login from './components/Login/Login';
import DashBoard from './components/DashBoard/DashBoard';
import SignUp from './components/SignUp/SignUp';

export const Routes: React.FC = () => {
    return (
        <Router>
            <RRoutes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route  path='/' element={<PrivateRoute />}>
                    <Route  path='/' element={<DashBoard />}/>
                </Route>
            </RRoutes>
        </Router>
    )
}