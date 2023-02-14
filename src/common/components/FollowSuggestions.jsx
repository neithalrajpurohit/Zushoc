import { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import Loading from "../assets/loading.png";
import { getFollowSuggestions } from "../../features/auth/authSlice";

export const FollowSuggestions = () => {
    const followProfiles = useSelector((state)=>state.auth.followUsers);
    const token = useSelector((state)=>state.auth.token);
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.auth.userLoading);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loading === false){
            dispatch(getFollowSuggestions(token));  // eslint-disable-next-line
        }}, [dispatch, token]
    );
    
    return(
        <div>
            <h1>Welcome new zushoc users !</h1>
            <div>
            {loading === true ? (
                <img src = {Loading} alt = "loading"/>
                ):(<ul>
                    {Array.isArray(followProfiles) ? (
                        followProfiles?.map((user)=>{
                            return (
                                <div key ={user?._id}
                                onClick={()=>{navigate(`/follow/${user.username}`)}}>
                                    <ul>
                                       <div>
                                           <li className="sugg-username" >
                                               {user?.name}
                                           </li>
                                         <li className="sugg-username" >
                                             @{user?.username}
                                         </li>
                                        </div> 

                                            <img className="sugg-img" src = {user?.profileURL} alt = "profile url"/>
                                    </ul>
                                </div>
                            )
                        })
                    )
                :(
                    <div>
                     <strong>Server Down!</strong>
                    </div>
                )}
                </ul>
                )} 
                 </div>
        </div>
    )
}