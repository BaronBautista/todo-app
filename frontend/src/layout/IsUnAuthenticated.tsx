import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";


const IsUnAuthenticated = () => {
    const { account } = useAuthStore();

    if(account) {
        return <Navigate to="/home" />;
    }

  return (
    <div>
       <Outlet />
    </div>
  )
}

export default IsUnAuthenticated
