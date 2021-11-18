import {Link} from "react-router-dom";

export const Header=()=>{
    return(
        <div style={{ position: "sticky", top: "0px", zIndex: "100" }}>
            <nav className="navg">
                <h1>Zushoc</h1>
                <div className="links-container">
                    <Link className="header-cnt" to="/">Home</Link>
                    <Link className="header-cnt" to ="/profile">Profile</Link>
                    <Link className="header-cnt" to ="/login">Logout</Link>
                </div>     
            </nav>
       </div>
    )
}