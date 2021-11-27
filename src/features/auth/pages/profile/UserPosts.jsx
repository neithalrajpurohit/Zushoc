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
                            <div key={post._id}>
                            <div>
                                <img src = {post?.postImage} alt = "post-img"/>
                            <p>{post?.content}</p>
                            <p>{post?.likedBy?.length}</p>
                            </div>
                            </div>
                        );
                    })} 
                    </div>
            )}
         </div>
    );
};