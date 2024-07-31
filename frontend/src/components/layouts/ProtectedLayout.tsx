import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
    const token = localStorage.getItem("token")

    return (
        token ? <Outlet /> : <Navigate to="/auth/login" />
    )
}
