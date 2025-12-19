import { Outlet, Navigate } from "react-router-dom";

const AuthGuard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.adminRole === "ADMIN";
  const otherRole = !isAdmin; //if admin then false,else true

  //if he is admin then he is allowed to /users if he is from other role then he is allowed to /availability
  
  return isAdmin ? <Outlet /> : <Navigate to="dashboard" replace />;
};

export default AuthGuard;
