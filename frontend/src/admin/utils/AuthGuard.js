import {Outlet,Navigate} from "react-router-dom";

const AuthGuard = () => {
    const token = localStorage.getItem("JwtToken");
    const user = !!token;
    return(
        <>
            {user ? <Outlet /> : <Navigate to="/adminlogin" />}
        </>
    );
}

export default AuthGuard;