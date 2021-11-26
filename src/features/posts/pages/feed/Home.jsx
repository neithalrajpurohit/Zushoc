import { useEffect, useState } from "react";
import {Post} from "../../../../common/components/Post";
import { getFeed } from "../../postSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../common/assets/loading.png";

export const Home = () =>{
    const [createPost,setCreatePost]=useState(false);
    const [showPost,setShowPost]=useState(true);
    const [showList,setShowList]=useState(true);
    const userId = useSelector((state)=>state.auth.data._id);
    const posts =useSelector((state)=>state.post.feedPost);
    const token = useSelector((state)=>state.auth.token);
    const loading = useSelector((state)=>state.post.postLoading);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getFeed({token}))
    },[dispatch,token]);
    
    return(
        <div>
            {loading === true ? (
                <div>
                    <img src = {Loading} alt="loading"/>
                    </div>
            ):(
                <div>
            {!createPost && (<div className="btn-container">
                <button className ="post-btn" onClick={() => {
                  setCreatePost(true);
                  setShowPost(false);
                  setShowList(false);
                }}>Post</button>
            </div>)}
            {showPost && (
                <div>
                    <div>
                        {posts?.map((post)=>{

                            return(
                            <div>
                                <p>@{post?.userId?.username}</p>
                                <img src ={post?.userId?.profileURL} alt="profile"/>
                                <p>{post?.userId?.name}</p>
                                <img src = {post?.postImage} alt = "post-img"/>
                                <p>{post?.content}</p>
                                <p>{post?.likedBy.length}</p>
                                {post?.likedBy?.includes(userId) ? (
                                    <button>like</button>  ) : (
                                    <button>unlike</button>
                                )}
                            </div>
                            );
                        })}
                        </div>
                    </div>
            )}
            {createPost && (<Post setCreatePost={setCreatePost} setShowPost={setShowPost} setShowList={setShowList} />)}
        </div>
            )}
        </div>
    )
                    };