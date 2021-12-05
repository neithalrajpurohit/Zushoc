import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getUserData,addFollowUser,removeFollowing} from "../../features/auth/authSlice";

export const FollowUserProfile = () =>{
      const { username } = useParams();
      const profile = useSelector((state) => state.auth.followUser);
      const followUserId = useSelector((state) => state.auth.followUser?._id);
      let token = useSelector((state) => state.auth.token);
      const userId = useSelector((state) => state.auth.data?._id);

      const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getUserData(username, token));
      },[dispatch,token,username]);

      const handleFollow = (e) => {
        e.preventDefault();
        dispatch(addFollowUser({ followUserId, userId }));
      };
    
      const handleUnFollow = (e) => {
        e.preventDefault();
        dispatch(removeFollowing({ followUserId, userId }));
      };

    return(
        <div>
            <img className="user-profile" src = {profile?.profileURL} alt = "Profile"/>
            <div className="user-name">{profile?.name}</div>
            <div className="user-username">@{profile?.username}</div>
            <div className="btn">
                {profile?.followersList?.includes(userId)?(
                    <button text ="unfollow" onClick={(e)=>handleUnFollow(e)}>UnFollow</button>)
                    :(<button text ="follow" onClick={(e)=>handleFollow(e)}>Follow</button>)
                }
            </div>
            <div className="user-bio">{profile?.bio}</div>
            <div className="user-follow">{profile?.followersList?.length}</div>
            <div className="user-follow">Followers</div>
            <div className="user-following">{profile?.followingList?.length}</div>
            <div className="user-following">Following</div>

        </div>
    )
}