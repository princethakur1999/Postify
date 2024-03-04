import { Navigate } from 'react-router-dom';

function Protected({ token, children }) {

    if (!token) {

        return <Navigate to='/login' replace />;
    }
    return children;
}

export default Protected;
