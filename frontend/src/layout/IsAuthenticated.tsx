import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";


const IsAuthenticated = () => {
    const { account } = useAuthStore();

    if(!account) {
        return <Navigate to="/login" />;
    }

  return (
    <div>
       <Outlet />
    </div>
  )
}

export default IsAuthenticated
