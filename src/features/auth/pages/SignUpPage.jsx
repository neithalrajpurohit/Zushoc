import {Link} from "react-router-dom";
export const Signup=()=>{
    return(
        <div className="auth-container">
            <form className="signup-cmp">
            <h1>Zushoc</h1>
            <p className="para-style">Sign up to view posts</p>
                <div>
                <input className="input-style" type="text" placeholder="Enter your name"/>
               </div>
               <div>
                <input className="input-style" type="text" placeholder="Enter your Username"/>
               </div>
               <div>
                <input className="input-style" type="text" placeholder="Enter your email"/>
               </div>
               <div>
                <input className="input-style" type="text" placeholder="Enter your password"/>
               </div>
               <div>
                <button className="signup-btn">Sign Up </button>
               </div>
                <p> Already have an account?<Link style={{textDecoration:"none"}} to="/login">Sign in</Link></p>
            </form>
        </div>
    )
}