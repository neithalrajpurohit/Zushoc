import { useSelector } from "react-redux"

export const Profile = () =>{

    const userProfile = useSelector((state)=>state.auth.data);
    // const token = useSelector((state)=>state.auth.token);
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
                <p>{userProfile?.follwersList?.length}</p>
                <p>FollwersList</p>
            </div>

        </div>
    )
}
