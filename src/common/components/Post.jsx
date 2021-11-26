import { useState } from "react";
import axios from "axios";
import { postTweet } from "../../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

export const Post = ({setCreatePost,setShowPost}) =>{
    const dispatch = useDispatch();
    const [imageURL,setImageURL]   = useState("");
    const [image,setImage] = useState("");
    const [content,setContent] = useState("");
    const userId = useSelector((state)=>state.auth.data._id);
    const token =useSelector((state)=>state.auth.token);

    const uploadHandler = async () =>{
        if(!image){
            console.log("Image is required");
        }
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset", "Zushoc");
        data.append("cloud_name", "dlfkr6n8m");
        try{
            const response = await axios.post("https://api.cloudinary.com/v1_1/dlfkr6n8m/image/upload",data);
            setImageURL(response.data.secure_url);
            return response.data;
        }catch(err){
            console.log({err});
        }
    }

    const postOnClick = () =>{
        if( imageURL !== "" | undefined | null){
            dispatch(postTweet({content, userId, token, imageURL}));
            setCreatePost(false);
            setShowPost(true);
        }
    }
    return (
        <div style={{marginTop:"7rem"}}>
            <div>  
                <textarea className="text-container" type="text" placeholder="Whats cooking ?" onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <div className="btn-component">
                <input className="center file-component" type ="file" onChange={(e)=>setImage(e.target.files[0])}/>
                <button className="center close-btn" 
                onClick={()=>{
                    setCreatePost(false);
                    setShowPost(true)}}
                >X</button>
                <button className="center post-component" onClick={()=>postOnClick()}  >Post</button>
                <button className="center add-component" onClick={()=>uploadHandler()}>+</button>
                <img src = {imageURL} alt ="images"/>
                <p className ="text-center">{content.length}/100 </p>
            </div>
        </div>
    )
}