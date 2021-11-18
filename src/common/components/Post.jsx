import { useState } from "react"
export const Post = ({setCreatePost,setShowPost}) =>{
    const [charCount,setCharCount] = useState(0);

    return (
        <div style={{marginTop:"7rem"}}>
            <div>  
                <textarea className="text-container" type="text" placeholder="Whats cooking ?" onChange={(e)=>setCharCount(e.target.value)}></textarea>
            </div>
            <div className="btn-component">
                <input className="center file-component" type ="file" />
                <button className="center close-btn" 
                onClick={()=>{
                    setCreatePost(false);
                    setShowPost(true)}} 
                >X</button>
                <button className="center post-component" >Post</button>
                <button className="center add-component" >+</button>
                <p className ="text-center">{charCount.length}/100 </p>
            </div>
        </div>
    )
}