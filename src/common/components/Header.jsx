import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/auth/authSlice";

export const Header=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const username = useSelector((state)=>state.auth.data.username);


    return(
        <header>
        <div style={{ position: "sticky", top: "0px", zIndex: "100" }}>
            <nav className="navg">
                <h1>Zushoc</h1>
                <div className="links-container">
                    <Link className="header-cnt" to="/">Home</Link>
                    <div className="header-cnt" to onClick={()=>navigate(`/profile/${username}`)}>Profile</div>
                    <Link className="header-cnt" to ="/followsuggestions">FollowSuggestions</Link>
                    <button className="logOut" onClick={()=>{ dispatch(logOutUser()) ; navigate("/login")} }>Logout</button>
                    
                </div>     
            </nav>
       </div>
        </header>
    )
}