import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link,useNavigate} from "react-router-dom";
import { loginUser } from "../authSlice";

export const Login = () => {
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state)=>state.auth.isUserLogedIn);

    useEffect(()=>{
        if (loggedIn === true){
            navigate("/");
        }
      });

    const handleLogin = (e) =>{
        e.preventDefault();
        const email = e.currentTarget[0].value.trim();
        const password = e.currentTarget[1].value.trim();
        if ( email === "" | password === ""){
            setError("Please enter valid details!")
        }
        dispatch(loginUser({email,password}));
    };

    return(
        <div>
            <form  onSubmit={handleLogin}>
                <div className="style-login">
                    <h1>Zushoc</h1>
                    <p style={{color:"grey",opacity:"100%"}}>Login to Oodles Tube </p>
                    <input className="input-login" id="email" placeholder="Enter your email"/>
                <div>
                    <input  className="input-login" id="password" placeholder="Enter your password"/>
                </div>
                    <p>{error}</p>
                <div>
                    <button className="login-btn" text="Login" type="submit">Login</button>
                </div>
                    <p> New user ? <Link style={{textDecoration:"none"}} to= "/signup">Signup</Link> </p>
                </div>
            </form>
        </div>
    );
};
export default Login;