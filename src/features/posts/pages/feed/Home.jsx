import { useState } from "react";
import {Post} from "../../../../common/components/Post";
export const Home = () =>{
    const [createPost,setCreatePost]=useState(false);
    const [showPost,setShowPost]=useState(true);
    
    return(
        <div>
            {!createPost && (<div className="btn-container">
                <button className ="post-btn" onClick={() => {
                  setCreatePost(true);
                  setShowPost(false);
                }}>Post</button>
            </div>)}
            {createPost && (<Post setCreatePost={setCreatePost} setShowPost={setShowPost} />)}
        </div>
    )
}