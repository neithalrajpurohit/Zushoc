import { useSelector } from "react-redux"
import Loading from "../../../../common/assets/loading.png";

export const UserPosts = () =>{
    const postList = useSelector((state)=>state.post.userPostList);
    let loading = useSelector((state)=>state.post.postLoading);
    return(
        <div>
            {loading === true ? (
                <div>
                <img src = {Loading} alt ="loading"/>
                </div>
            ):
            (
                <div>
                     {postList?.map((post)=>{
                        return(
                            <div className="cards" key={post._id}>
                            <div>
                                <img className="pro-image" src = {post?.postImage} alt = "post-img"/>
                            <p className="pro-content">{post?.content}</p>
                            <p className="pro-content">{post?.likedBy?.length} likes</p>
                            </div>
                            </div>
                        );
                    })} 
                    </div>
            )}
         </div>
    );
};