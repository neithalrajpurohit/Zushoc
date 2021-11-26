import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../features/auth/authSlice";
export const Header=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    return(
        <div style={{ position: "sticky", top: "0px", zIndex: "100" }}>
            <nav className="navg">
                <h1>Zushoc</h1>
                <div className="links-container">
                    <Link className="header-cnt" to="/">Home</Link>
                    <Link className="header-cnt" to ="/profile">Profile</Link>
                    <Link className="header-cnt" to ="/followsuggestions">FollowSuggestions</Link>

                    <button className="header-cnt" onClick={()=>{ dispatch(logOutUser()) ; navigate("/login")} }>Logout</button>
                    
                </div>     
            </nav>
       </div>
    )
}