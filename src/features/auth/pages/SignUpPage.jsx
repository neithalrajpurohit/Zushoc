import { useEffect, useState } from "react";
import {Link,  useNavigate} from "react-router-dom";
import { signupUser } from "../authSlice";
import { useDispatch,useSelector } from "react-redux";

export const Signup=()=>{
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  useEffect(()=>{
      if (loggedIn === true){
          navigate("/");
      }
    },[loggedIn,navigate]);

    const handleSignup =(e) =>{
        e.preventDefault();
        let name = e.currentTarget[0].value.trim();
        const username = e.currentTarget[1].value.trim();
        const email = e.currentTarget[2].value.trim();
        const password = e.currentTarget[3].value.trim();
        console.log(name,username,email,password);
        if ( name === "" | username === ""| email === "" | password === "" ){
            setError("Please enter valid details");
        }
        dispatch(signupUser({name,username,email,password}));
    }

    return(
        <div className="auth-container">
            <form className="signup-cmp" onSubmit={handleSignup}>
                <h1>Zushoc</h1>
                    <p className="para-style">Sign up to view posts</p>
                <div>
                    <input className="input-style" id="name" placeholder="Enter your name"/>
               </div>
                    <div>
                        <input className="input-style" id="username" placeholder="Enter your Username"/>
                    </div>
               <div>
                    <input className="input-style" id="email" placeholder="Enter your email"/>
               </div>
                  <div>
                    <input className="input-style" type="password" id="password" placeholder="Enter your password"/>
                  </div>
                    <p>{error}</p>
               <div>
                    <button className="signup-btn" text="sign up" type="submit">Sign Up </button>
               </div>
                     <p> Already have an account?
                    <Link style={{textDecoration:"none"}} to="/login">Sign in</Link></p>
            </form>
        </div>
    );
};
export default Signup;