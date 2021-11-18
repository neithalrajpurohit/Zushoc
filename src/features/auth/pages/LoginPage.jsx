import {Link} from "react-router-dom";

export const Login = () => {
    return(
        <div>
        <div className="style-login">
            <h1>Oodles Tube</h1>
            <p style={{color:"grey",opacity:"100%"}}>Login to Oodles Tube </p>
            <input className="input-login" type="text" placeholder="Enter your email"/>
            <div>
            <input  className="input-login" type="text" placeholder="Enter your password"/>
            </div>
            <div>
            <button className="login-btn">Login</button>
            </div>
            <p> New user ? <Link style={{textDecoration:"none"}} to= "/signup">Signup</Link> </p>
        </div>
        </div>
    )
}