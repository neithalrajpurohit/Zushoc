import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserCreatedPosts } from "../../../posts/postSlice";
import { UserPosts } from "./UserPosts";
import { getLoggedInUser, isAuthenticated } from "../../authSlice";

export const Profile = () => {
  const userProfile = useSelector((state) => state.auth.data);
  const token = useSelector((state) => state.auth.token);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAllUserCreatedPosts({ username, token }));
    }
  }, [dispatch, username, token]);

  useEffect(() => {
    if (token) {
      dispatch(getLoggedInUser({ token }));
    }
  }, [token]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img
          className="profile-img"
          src={userProfile?.profileURL}
          alt="profile"
        />
      </div>
      <div>
        <p className="userDetails-name">{userProfile?.name}</p>
      </div>
      <div>
        <p className="userName">@{userProfile?.username}</p>
      </div>
      <div>
        <p className="userDetails-bio">{userProfile?.bio}</p>
      </div>
      <div>
        <p className="userDetails-follow">
          {userProfile?.followersList?.length}
        </p>
        <p className="userDetails-follow">Followers</p>
      </div>
      <div>
        <p className="userDetails-following">
          {userProfile?.followingList?.length}
        </p>
        <p className="userDetails-following">Following</p>
      </div>
      <UserPosts />
    </div>
  );
};
