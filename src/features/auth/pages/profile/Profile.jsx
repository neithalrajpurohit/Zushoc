import { useEffect ,useParams} from "react";
import { useSelector,useDispatch} from "react-redux";
import { getAllUserCreatedPosts } from "../../../posts/postSlice";


export const Profile = () =>{

    const userProfile = useSelector((state)=>state.auth.data);
    const token = useSelector((state)=>state.auth.token);
    const {username} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUserCreatedPosts({username,token}));
         }, [dispatch,username,token]);
        
    return(
        <div>
            <div>
                <img src = {userProfile?.profileURL } alt = "profile" />
            </div>
            <div>
                <p>{userProfile?.name}</p>
            </div>
            <div>
                <p>{userProfile?.username}</p>
            </div>
            <div>
                <p>{userProfile?.bio}</p>
            </div>
            <div>
                <p>{userProfile?.followingList?.length}</p>
                <p>FollowingList</p>
            </div>
            <div>
                <p>{userProfile?.followersList?.length}</p>
                <p>FollwersList</p>
            </div>

        </div>
    )
}
