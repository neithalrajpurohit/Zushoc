
import { Navigate } from "react-router-dom";

export function PrivateRoute ({children}){
    let token = localStorage?.getItem("login");
    return token ? children : <Navigate to ="/login"/>

}
